'use babel'

import {React} from 'react-for-atom';
import YeomanPrompt from './YeomanPrompt';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-modal-panel native-key-bindings" onKeyPress={(e) => e.key == "Esc" ? this.props.onCancelled() : console.log(e.key)}>
        <YeomanPrompt {...this.props}/>
      </div>
    );
  }
});
