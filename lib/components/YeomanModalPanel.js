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
          message: "What are your favourites front-end framework",
          choices: ["React", "AngularJS", "Vue.js"]
        }, {
          type: "list",
          name: "backendfavourite",
          message: "What is your favourite back-end framework",
          choices: ["ExpressJS", "SailsJS", "Hapi"]
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
