import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {formReducer, FormState} from './form';
import {listReducer, ListState} from './list';

export interface State {
  form: FormState;
  list: ListState;
}

export function createAppStore() {
  const reducers = {form: formReducer, list: listReducer};
  return createStore(combineReducers(reducers), applyMiddleware(thunk));
}
