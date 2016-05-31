'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-confirm-prompt">
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: true})}>Yes</button>
        <button type="button" className="validate" onClick={() => this.props.onAnswered({value: false})}>No</button>
      </div>
    );
  }
});
