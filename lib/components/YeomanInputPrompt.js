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
  render: function() {
    return (
      <div className="yeoman-input-prompt">
        <input
          type="text"
          ref={elem => this.inputField = elem}
          placeholder={`Default value: ${this.props.default}`}
          className="native-key-bindings"
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
          onKeyPress={e => e.key == "Enter" && this.props.onAnswered({value: this.state.text})}
        />
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: this.state.text})}>Validate</button>
      </div>
    );
  }
});
