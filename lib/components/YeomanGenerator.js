'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  propTypes: {
    namespace: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    if (this.props.name == "app") {
      return (
        <div className="yeoman-generator" onClick={this.props.onClick}>
          <span className="namespace">{this.props.namespace}</span>
          <hr/>
        </div>
      );
    } else {
      return (
        <div className="yeoman-subgenerator" onClick={this.props.onClick}>
          <span className="name">{this.props.name}</span>
        </div>
      );
    }
  }
});
