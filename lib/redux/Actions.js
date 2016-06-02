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
      allowUnsafeAsync((cb) => {
        try {
          let specializedEnv = allowUnsafe(() => yeoman.createEnv(undefined, undefined, YeomanAdapter));
          specializedEnv.store = env.store;
          process.chdir(cwd);
          specializedEnv.run(`${namespace}:${name}`, {
            cwd
          }, () => {
            cb();
            taskRunner.taskIsFinished(id);
          });
        } catch (e) {
          cb();
          console.log(e);
          taskRunner.taskIsFinished(id);
        }
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
