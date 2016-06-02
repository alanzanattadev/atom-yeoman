'use babel'

import {React, update} from 'react-for-atom';

export default React.createClass({
  getInitialState: function() {
    return {
      text: ""
    };
  },
  componentDidMount: function() {
    this.inputField.focus();
  },
  componentDidUpdate: function(prevProps) {
    if (prevProps != this.props) {
      this.setState(update(this.state, {
        text: {$set: ""}
      }));
    }
  },
  answer: function() {
    this.props.onAnswered({value: this.state.text != "" ? this.state.text : this.props.default})
  },
  render: function() {
    return (
      <div className="yeoman-password-prompt">
        <input
          ref={elem => this.inputField = elem}
          type="password"
          placeholder={`Default value: ${this.props.default}`}
          className="native-key-bindings"
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
          onKeyPress={e => e.key == "Enter" && this.answer()}
        />
        <button type="button" className="validate" onClick={() => this.answer()}>Validate</button>
      </div>
    );
  }
});
