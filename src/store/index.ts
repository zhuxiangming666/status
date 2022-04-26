/** @format */

import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import tasks from './task/reducer';
const reducers = combineReducers({
  tasks,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promise)));
export default store;
