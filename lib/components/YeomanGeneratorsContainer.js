'use babel'

import {React} from 'react-for-atom';
import store from '../redux/Store';
import {refreshGenerators, runGenerator} from '../redux/Actions';

export default React.createClass({
  getInitialState: function() {
    return this.getUpdatedState();
  },
  componentDidMount: function() {
    this.unsubscribe = store.subscribe(this.updateGenerators);
    store.dispatch(refreshGenerators());
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  updateGenerators: function() {
    this.setState(this.getUpdatedState());
  },
  getUpdatedState: function() {
    return {
      generators: store.getState().generators
    };
  },
  onGeneratorClick: function(namespace, name) {
    store.dispatch(runGenerator(namespace, name));
  },
  render: function() {
    return (
      React.cloneElement(this.props.children, {
        ...this.state,
        onGeneratorClick: this.onGeneratorClick
      })
    );
  }
});
