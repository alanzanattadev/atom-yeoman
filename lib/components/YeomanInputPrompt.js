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
      <div className="yeoman-input-prompt">
        <input type="text" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: this.state.text})}>Validate</button>
      </div>
    );
  }
});
