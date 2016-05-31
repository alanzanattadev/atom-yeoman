'use babel'

import {React} from 'react-for-atom';
import YeomanPrompt from './YeomanPrompt';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-modal-panel">
        <YeomanPrompt questions={[{
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
        }]} onAnswered={(answers) => console.log(answers)}/>
      </div>
    );
  }
});
