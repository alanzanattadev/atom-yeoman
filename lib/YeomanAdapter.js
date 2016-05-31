'use babel'

import {ReactDOM, React} from 'react-for-atom';
import {modalYeomanView, modalPanel} from './yeoman';
import YeomanModalPanel from './components/YeomanModalPanel';

export default {
  prompt: function(questions, cb) {
    cb = cb || () => {};
    ReactDOM.render(<YeomanModalPanel
      questions={questions}
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
