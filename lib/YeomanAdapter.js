'use babel'

import {ReactDOM, React} from 'react-for-atom';
import {modalYeomanView, modalPanel} from './yeoman';
import YeomanModalPanel from './components/YeomanModalPanel';

export default {
  prompt: function(questions, cb) {
    cb = cb || () => {};
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
      }]}
      onAnswered={(answers) => {
        console.log(answers);
        modalPanel.hide();
        cb(answers);
      }}
      onCancelled={() => this.modalPanel.hide()}/>, modalYeomanView.getElement());
    modalPanel.show();
  },

  diff: function(diff, expected) {

  },

  log: function(msg, ctx) {

  },
};
