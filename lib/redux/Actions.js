'use babel'

var loophole = require('loophole');
var {allowUnsafeEval, allowUnsafeNewFunction} = loophole;
loophole.Function.prototype = Function.prototype;
var vm = require('vm');

function allowUnsafe(fn) {
  return allowUnsafeEval(() => allowUnsafeNewFunction(fn))
};

function allowUnsafeAsync(fn) {
  previousEval = global.eval;
  previousFunction = global.Function;
  let restore = () => {
    global.Function = previousFunction;
    global.eval = previousEval;
  };
  let replace = () => {
    global.eval = (source) => vm.runInThisContext(source);
    global.Function = loophole.Function;
  }
  try {
    replace();
    fn(restore);
  } catch (e) {
    restore();
  }
};

import YeomanAdapter from '../YeomanAdapter';
var yeoman = allowUnsafe(() => require("yeoman-environment"));
allowUnsafe(() => require('yeoman-generator'));
let env = allowUnsafe(() => yeoman.createEnv(undefined, undefined, YeomanAdapter));
import {fork} from 'child_process';


let creators = {
  createGeneratorsRefreshedAction: function(generators) {
    return {
      type: "GENERATORS_REFRESHED",
      generators
    };
  },
  runGenerator: function(namespace, name) {
    return (dispatch) => {
      let {taskRunner} = require('../yeoman');
      let id = taskRunner.taskIsStarted({
        package: "yeoman",
        action: `run ${namespace}:${name}`
      });
      let cwd = '/home/main/Dirt';
      let child = fork(__dirname + '/../subprocesses/index.js', [], {
        cwd,
        env: {
          TASK_ID: id,
          GENERATOR_NAME: name,
          GENERATOR_NAMESPACE: namespace
        },
        silent: true
      });
      let questionsQueue = [];
      let questionning = false;
      child.stdout.on('data', (data) => console.log(`[Child ${child.pid} of Task ${id}] ${data}`));
      child.stderr.on('data', (data) => console.log(`[Child ${child.pid} of Task ${id}] ${data}`));
      console.log(`Child process with pid ${child.pid} for task ${id} started`);
      child.on('message', (message) => {
        if (message.questions) {
          questionsQueue.push(message.questions);
          function prompt() {
            questionning = true;
            YeomanAdapter.prompt(questionsQueue.shift(), (answers, err) => {
              questionning = false;
              if (answers) {
                console.log(`${answers} sent to ${child.pid} - task ${id}`);
                child.send({answers});
              } else if (err) {
                console.log(`Cancelled with error ${err.toString()}, sending exit to ${child.pid}`);
                child.send({exit: true});
                taskRunner.taskIsFinished(id, "error");
              } else {
                console.log(`Cancelled without error, sending exit to ${child.pid}`);
                child.send({exit: true});
                taskRunner.taskIsFinished(id, "cancel");
              }
              if (questionsQueue.length > 0)
                prompt();
            });
          }
          if (questionning === false)
            prompt();
        } else if (message.task) {
          if (message.task.state == "finished") {
            console.log(`Generator of task ${id} / pid ${child.pid} has finished without error`);
            taskRunner.taskIsFinished(id);
          } else if (message.task.state == "error") {
            console.log(`Generator of task ${id} / pid ${child.pid} has finished with error ${message.task.error.toString()}`);
            taskRunner.taskIsFinished(id, "error");
          }
        }
      });
      child.on('exit', () => {
        console.log(`Generator of task ${id} / pid ${child.pid} has exited`);
      });
    }
  },
  refreshGenerators: function() {
    return (dispatch) => {
      // dispatch(creators.createGeneratorsRefreshAction());
      allowUnsafeAsync((cb) => {
        env.lookup(function() {
          let meta = env.getGeneratorsMeta();
          console.log(meta);
          let generators = Object.keys(meta).map(str => ({namespace: str.split(':')[0], name: str.split(':')[1]}));
          cb();
          dispatch(creators.createGeneratorsRefreshedAction(generators));
        });
      });
      // dispatch(creators.createGeneratorsRefreshedErrorAction(, error));
    };
  },
};

export default creators;
