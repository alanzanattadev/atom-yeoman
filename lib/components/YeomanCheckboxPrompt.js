'use babel'

import {React, update} from 'react-for-atom';
import {fromJS} from 'immutable';

export default React.createClass({
  getInitialState: function() {
    return {
      values: []
    };
  },
  componentDidUpdate: function(prevProps) {
    if (prevProps != this.props) {
      this.setState(update(this.state, {
        values: {$set: []}
      }));
    }
  },
  onChange: function(value) {
    let index = this.state.values.findIndex(v => v.name == value);
    this.setState(update(this.state, {
      values: {$set: index == -1 ? fromJS(this.state.values).push(value).toJS() : fromJS(this.state.values).remove(index).toJS()}
    }));
  },
  render: function() {
    return (
      <div className="yeoman-checkbox-prompt">
        {this.props.choices.map((choice, i) => (
          <div className="choice" key={`choice${i}`}>
            <span>{typeof choice == 'string' ? choice : choice.name}</span>
            <input type="checkbox" checked={this.state.values.find(v => v == (typeof choice == 'string' ? choice : choice.name)) !== undefined} onChange={(e) => this.onChange(typeof choice == 'string' ? choice : choice.name)}/>
          </div>
        ))}
        <button className="validate" type="button" onClick={() => this.props.onAnswered({value: this.state.values})}>Validate</button>
      </div>
    );
  }
});
