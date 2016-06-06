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
    if (!atom.packages.getActivePackage("task-runner")) {
      atom.notifications.addError("Yeoman Package cannot be activated", {detail: "task-runner package not installed"});
      return;
    }
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
    }));
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
