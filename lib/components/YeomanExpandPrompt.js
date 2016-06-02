'use babel'

import {React} from 'react-for-atom';
import {fromJS} from 'immutable';
import YeomanListPrompt from './YeomanListPrompt';

export default React.createClass({
  render: function() {
    return (
      // <div className="yeoman-expand-prompt">
        <YeomanListPrompt
          name={this.props.name}
          default={typeof this.props.default === 'function' ? this.props.default(this.state.answers) : this.props.default}
          choices={(typeof this.props.choices === 'function' ? this.props.choices(this.state.answers) : this.props.choices).map(choice => fromJS(choice).set('name', `${choice.key}) ${choice.name}`).toJS())}
          onAnswered={this.props.onAnswered}
        />
      // </div>
    );
  }
});
