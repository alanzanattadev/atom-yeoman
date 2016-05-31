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
    ReactDOM.render(<YeomanModalPanel
      questions={[{
        type: "rawlist",
        name: "frontendfavourite",
        message: "What are is your favourite front-end framework",
        choices: ["React", "AngularJS", "Vue.js"]
      }, {
        type: "list",
        name: "backendfavourite",
        message: "What is your favourite back-end framework",
        choices: ["ExpressJS", "SailsJS", "Hapi"]
      }, {
        type: "checkbox",
        name: "languages",
        message: "What languages do you use",
        choices: ["javascript", "ruby", "python", "c++"]
      }, {
        type: "confirm",
        name: "redux",
        message: "Do you use redux"
      }, {
        type: "input",
        name: "projectname",
        message: "Your project name"
      }, {
        type: "password",
        name: "password",
        message: "Your project password"
      }]}
      onAnswered={(answers) => {
        console.log(answers);
        this.modalPanel.hide();
      }}
      onCancelled={() => this.modalPanel.hide()}/>, this.modalYeomanView.getElement());
    this.modalPanel.show();
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

  toggle() {
    console.log('Yeoman was toggled!');
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }

};
