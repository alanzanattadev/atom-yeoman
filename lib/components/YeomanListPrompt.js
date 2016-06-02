'use babel'

import {React} from 'react-for-atom';
import classNames from "classnames";

export default React.createClass({
  render: function() {
    return (
      <div className="yeoman-list-prompt">
        {this.props.choices.map((choice, i) => (
          <div
            key={`choice${i}`}
            className={classNames("choice", {selected: this.props.default == (typeof choice == "string" ? choice : choice.value)})}
            onClick={() => this.props.onAnswered({value: typeof choice == "string" ? choice : choice.value})}>
            <span>{typeof choice == "string" ? choice : choice.name}</span>
          </div>
        ))}
      </div>
    );
  }
});
