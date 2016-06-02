'use babel';

import YeomanView from './yeoman-view';
import { CompositeDisposable } from 'atom';
import {React, ReactDOM} from 'react-for-atom'
import YeomanRightPanel from './components/YeomanRightPanel';
import YeomanModalPanel from './components/YeomanModalPanel';

export default {

  yeomanView: null,
  rightPanel: null,
  modalPanel: null,
  subscriptions: null,
  modalYeomanView: null,

  activate(state) {
    this.yeomanView = new YeomanView(state.yeomanViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.yeomanView.getElement(),
      visible: false
    });
    this.modalYeomanView = new YeomanView(state.yeomanModalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.modalYeomanView.getElement(),
      visible: false
    });
    ReactDOM.render(<YeomanRightPanel/>, this.yeomanView.getElement());
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'yeoman:toggle': () => this.toggle(),
      'yeoman:prompt': () => this.prompt()
    }));
  },

  prompt: function() {
    let YeomanAdapter = require('./YeomanAdapter');
    YeomanAdapter.prompt([{
      type: "rawlist",
      name: "frontendfavourite",
      message: "What are is your favourite front-end framework",
      default: "React",
      choices: ["AngularJS", "Vue.js", "React"]
    }, {
      type: "list",
      name: "backendfavourite",
      message: "What is your favourite back-end framework",
      default: "ExpressJS",
      choices: ["ExpressJS", "SailsJS", "Hapi"]
    }, {
      type: "checkbox",
      name: "languages",
      message: "What languages do you use",
      default: ['ruby', 'c++'],
      choices: ["javascript", "ruby", "python", "c++"]
    }, {
      type: "confirm",
      name: "redux",
      message: "Do you use redux"
    }, {
      type: "input",
      name: "projectname",
      message: "Your project name",
      default: "Alan"
    }, {
      type: "password",
      name: "password",
      message: "Your project password",
      default: "azerty"
    }, {
    type: 'expand',
    message: 'Conflict on `file.js`: ',
    name: 'overwrite',
    choices: [
      {
        key: 'y',
        name: 'Overwrite',
        value: 'overwrite'
      },
      {
        key: 'a',
        name: 'Overwrite this one and all next',
        value: 'overwrite_all'
      },
      {
        key: 'd',
        name: 'Show diff',
        value: 'diff'
      },
      {
        key: 'x',
        name: 'Abort',
        value: 'abort'
      }
    ]
  }], function() {
      console.log("callback");
    },);
  },

  deactivate() {
    this.rightPanel.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yeomanView.destroy();
  },

  serialize() {
    return {
      yeomanViewState: this.yeomanView.serialize(),
      yeomanModalViewState: this.modalYeomanView.serialize(),
    };
  },

  consumeTaskRunner: function(taskRunner) {
    this.taskRunner = taskRunner;
  },

  toggle() {
    console.log('Yeoman was toggled!');
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }

};
