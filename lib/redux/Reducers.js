'use babel'

import { combineReducers } from 'redux';
import {fromJS} from 'immutable';

function generators(state = [], action) {
  switch(action.type) {
    case "GENERATORS_REFRESHED":
      return action.generators;
      break;
    default:
      return state;
  }
}

export default combineReducers({
  generators
});
