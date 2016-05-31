'use babel'

import {React} from 'react-for-atom';
import YeomanPrompt from './YeomanPrompt';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-modal-panel">
        <YeomanPrompt questions={[{
          type: "checkbox",
          name: "frontendfavourite",
          message: "What is your favourite front-end framework",
          choices: ["React", "AngularJS", "Vue.js"]
        }, {
          type: "checkbox",
          name: "backendfavourite",
          message: "What is your favourite back-end framework",
          choices: ["ExpressJS", "SailsJS", "Hapi"]
        }]} onAnswered={(answers) => console.log(answers)}/>
      </div>
    );
  }
});
