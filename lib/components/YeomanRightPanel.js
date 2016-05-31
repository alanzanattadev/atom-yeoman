'use babel'

import {React} from 'react-for-atom';
import YeomanGeneratorsContainer from './YeomanGeneratorsContainer';
import YeomanGenerators from './YeomanGenerators';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-right-panel">
        <YeomanGeneratorsContainer>
          <YeomanGenerators/>
        </YeomanGeneratorsContainer>
      </div>
    );
  }
});
