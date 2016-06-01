'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="yeoman-generator" onClick={this.props.onClick}>
        <span className="namespace">{this.props.namespace}</span>:<span className="name">{this.props.name}</span>
      </div>
    );
  }
});
