'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  getInitialState: function() {
    return {
      text: ""
    };
  },
  render: function() {
    return (
      <div className="yeoman-password-prompt">
        <input type="password" className="native-key-bindings" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: this.state.text})}>Validate</button>
      </div>
    );
  }
});
