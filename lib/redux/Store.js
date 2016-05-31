'use babel'

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import app from './Reducers';

let store = createStore(app, applyMiddleware(reduxThunk));

export default store;
