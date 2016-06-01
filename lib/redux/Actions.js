'use babel'

var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
function allowUnsafe(fn) {
  return allowUnsafeEval(() => allowUnsafeNewFunction(fn))
};
import YeomanAdapter from '../YeomanAdapter';
var yeoman = allowUnsafe(() => require("yeoman-environment"));
let env = yeoman.createEnv(undefined, undefined, YeomanAdapter);

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
      allowUnsafe(() => {
        try {
          env.run(`${namespace}:${name}`, {
            cwd: '/home/main/Dirt/'
          }, () => {
            taskRunner.taskIsFinished(id);
          });
        } catch (e) {
          console.log(e);
          taskRunner.taskIsFinished(id);
        }
      });
    }
  },
  refreshGenerators: function() {
    return (dispatch) => {
      // dispatch(creators.createGeneratorsRefreshAction());
      env.lookup(function() {
        let meta = env.getGeneratorsMeta();
        console.log(meta);
        let generators = Object.keys(meta).map(str => ({namespace: str.split(':')[0], name: str.split(':')[1]}));
        dispatch(creators.createGeneratorsRefreshedAction(generators));
      })
      // dispatch(creators.createGeneratorsRefreshedErrorAction(, error));
    };
  },
};

export default creators;
