'use babel'

import {React} from 'react-for-atom';
import YeomanGenerator from './YeomanGenerator';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-generators">
        {this.props.generators.map((generator, i) => <YeomanGenerator key={`generator${i}`} namespace={generator.namespace} name={generator.name}/>)}
      </div>
    )
  }
});
