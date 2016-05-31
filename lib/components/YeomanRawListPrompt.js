'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-rawlist-prompt">
        {this.props.choices.map((choice, i) => (
          <div className="choice" onClick={() => this.props.onAnswered({value: typeof choice == "string" ? choice : choice.value})}>
            <span>{i}</span> <span>{typeof choice == "string" ? choice : choice.name}</span>
          </div>
        ))}
      </div>
    );
  }
});
