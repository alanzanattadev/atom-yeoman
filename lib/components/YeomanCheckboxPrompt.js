'use babel'

import {React, update} from 'react-for-atom';
import {fromJS} from 'immutable';

export default React.createClass({
  getInitialState: function() {
    return {
      values: this.props.default ? this.props.default.map(v => typeof v === 'string' ? v : v.value) : []
    };
  },
  componentDidMount: function() {
    this.checkbox0.focus();
  },
  componentDidUpdate: function(prevProps) {
    if (prevProps != this.props) {
      this.setState(update(this.state, {
        values: {$set: []}
      }));
    }
  },
  onChange: function(value) {
    let index = this.state.values.findIndex(v => v == value);
    this.setState(update(this.state, {
      values: {$set: index == -1 ? fromJS(this.state.values).push(value).toJS() : fromJS(this.state.values).remove(index).toJS()}
    }));
  },
  answer: function() {
    this.props.onAnswered({value: this.state.values});
  },
  handleKeyPress: function(e) {
    if (e.key == "Enter") {
      this.answer();
    } else if (e.keyCode == 47 || e.keyCode == 49) {

    }
  },
  render: function() {
    return (
      <div className="yeoman-checkbox-prompt">
        {this.props.choices.map((choice, i) => (
          <div className="choice" key={`choice${i}`}>
            <span>{typeof choice == 'string' ? choice : choice.name}</span>
            <input
              type="checkbox"
              className="native-key-bindings"
              tabIndex={i}
              ref={elem => this['checkbox' + i] = elem}
              checked={this.state.values.find(v => v == (typeof choice == 'string' ? choice : choice.value)) !== undefined}
              onKeyPress={this.handleKeyPress}
              onChange={(e) => this.onChange(typeof choice == 'string' ? choice : choice.value)}/>

          </div>
        ))}
        <button
          className="validate"
          type="button"
          onClick={this.answer}
        >Validate</button>
      </div>
    );
  }
});
