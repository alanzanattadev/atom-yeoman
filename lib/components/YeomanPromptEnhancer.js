'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-prompt-enhancer">
        <span className="message">{this.props.message}</span>
        {this.props.children}
      </div>
    );
  }
});
