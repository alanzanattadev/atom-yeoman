'use babel'

import {React} from 'react-for-atom';
import YeomanGenerator from './YeomanGenerator';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-generators">
        {this.props.generators.sort((a, b) => a.namespace.attr - b.namespace.attr).map((generator, i) => (
          <YeomanGenerator
            onClick={() => this.props.onGeneratorClick(generator.namespace, generator.name)}
            key={`generator${i}`}
            namespace={generator.namespace}
            name={generator.name}
          />
        ))}
      </div>
    )
  }
});
