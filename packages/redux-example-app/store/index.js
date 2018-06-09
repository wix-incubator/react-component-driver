import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {formReducer} from './form';
import {listReducer} from './list';

export function createAppStore() {
  const reducers = {form: formReducer, list: listReducer};
  return createStore(combineReducers(reducers));
}

