'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  getInitialState: function() {
    return {
      text: ""
    };
  },
  componentDidMount: function() {
    this.inputField.focus();
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
          onKeyPress={e => e.key == "Enter" && this.props.onAnswered({value: this.state.text})}
        />
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: this.state.text})}>Validate</button>
      </div>
    );
  }
});
