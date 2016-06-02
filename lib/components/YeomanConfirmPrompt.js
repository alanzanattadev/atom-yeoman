'use babel'

import {React, update} from 'react-for-atom';
import classNames from 'classnames';

export default React.createClass({
  getInitialState: function() {
    return {
      value: this.props.default === undefined || this.props.default === true ? true : false
    };
  },
  componentDidMount: function() {
    this.form.focus();
  },
  componentDidUpdate: function(prevProps) {
    if (prevProps != this.props) {
      this.setState(update(this.state, {
        value: {$set: this.props.default === undefined || this.props.default === true ? true : false}
      }));
    }
  },
  handleKeys: function(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
      this.setState(update(this.state, {
        value: {$set: !this.state.value}
      }));
    } else if (e.key == "Enter") {
      this.props.onAnswered({value: this.state.value});
    }
  },
  render: function() {
    return (
      <div className="yeoman-confirm-prompt native-key-bindings" tabIndex={1} ref={elem => this.form = elem} onKeyPress={this.handleKeys}>
        <button type="button" className={classNames("validate", {"selected": this.state.value})} onClick={() => this.props.onAnswered({value: true})}>Yes</button>
        <button type="button" className={classNames("validate", {"selected": !this.state.value})} onClick={() => this.props.onAnswered({value: false})}>No</button>
      </div>
    );
  }
});
