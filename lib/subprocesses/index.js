'use babel'
// @flow weak

process.on('message', (message) => {
  if (message.exit)
    process.exit(0);
});

process.on('disconnect', () => {
  process.exit(0);
})

var yeoman = require('yeoman-environment');
var YeomanAdapter = require('./Adapter');

try {
  var env = yeoman.createEnv(undefined, undefined, YeomanAdapter);
  env.lookup(function () {
    env.run(`${process.env.GENERATOR_NAMESPACE}:${process.env.GENERATOR_NAME}`, () => {
      process.send({task: {state: "finished", id: process.env.TASK_ID}});
    });
  });
} catch (e) {
  console.log(e);
  process.send({task: {state: "error", id: process.env.TASK_ID, error: e}});
  process.exit(0);
}
