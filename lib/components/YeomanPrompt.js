'use babel'

import {React, update} from 'react-for-atom';
import {fromJS} from 'immutable';
import YeomanInputPrompt from './YeomanInputPrompt';
import YeomanCheckboxPrompt from './YeomanCheckboxPrompt';
import YeomanConfirmPrompt from './YeomanConfirmPrompt';
import YeomanListPrompt from './YeomanListPrompt';
import YeomanPasswordPrompt from './YeomanPasswordPrompt';

let YeomanRawlistPrompt = () => <div/>;
let YeomanExpandPrompt = () => <div/>;

export default React.createClass({
  getInitialState: function() {
    return {
      questionIndex: 0,
      answers: {}
    };
  },
  propTypes: {
    onAnswered: React.PropTypes.func.isRequired,
    questions: React.PropTypes.array.isRequired
  },
  onAnswered: function(answers) {
    this.props.onAnswered(answers);
  },
  selectPromptComponent: function(question) {
    switch (question.type) {
      case "input":
        return YeomanInputPrompt;
        break;
      case "confirm":
        return YeomanConfirmPrompt;
        break;
      case "list":
        return YeomanListPrompt;
        break;
      case "rawlist":
        return YeomanRawlistPrompt;
        break;
      case "expand":
        return YeomanExpandPrompt;
        break;
      case "checkbox":
        return YeomanCheckboxPrompt;
        break;
      case "password":
        return YeomanPasswordPrompt;
        break;
      default:
        return (<div/>);
    }
  },
  nextQuestion: function(answer) {
    console.log(answer);
    let question = this.props.questions[this.state.questionIndex]
    let answers = fromJS(this.state.answers)
                    .set(question.name, answer.value)
                    .toJS();
    let finished;
    let index;
    if (this.props.questions.length - this.state.questionIndex == 1)
      finished = true;
    else {
      index = this.props.questions.slice(this.state.questionIndex + 1).findIndex(q => this.questionMustBeAsked(q));
      finished = (index == -1);
    }
    this.setState(update(this.state, {
      questionIndex: {$set: finished ? 0 : index + 1},
      answers: {$set: finished ? {} : answers}
    }), () => {
      if (finished) {
        this.onAnswered(answers);
      }
    });
  },
  questionMustBeAsked: function(question) {
    return (question.when === undefined || question.when === true || (typeof question.when === "function" && question.when(this.state.answers) === true));
  },
  render: function() {
    if (this.props.questions.length > 0) {
      let question = this.props.questions[this.state.questionIndex];
      let Prompt = this.selectPromptComponent(question);
      return (
        <div className="yeoman-prompt">
          <Prompt
            name={question.name}
            message={typeof question.message === 'function' ? question.message(this.state.message) : question.message}
            default={typeof question.default === 'function' ? question.default(this.state.answers) : question.default}
            choices={typeof question.choices === 'function' ? question.choices(this.state.answers) : question.choices}
            validate={question.validate}
            filter={question.filter}
            onAnswered={this.nextQuestion}
          />
        </div>
      );
    } else {
      return undefined;
    }
  }
});