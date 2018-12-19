import {createStore, applyMiddleware, combineReducers, Store} from 'redux';
import thunk from 'redux-thunk';

import {formReducer, FormState, FormAction} from './form';
import {listReducer, ListState, ListAction} from './list';

export interface State {
  form: FormState;
  list: ListState;
}

export function createAppStore(): Store<State, FormAction | ListAction> {
  const reducers = {form: formReducer, list: listReducer};
  return createStore(combineReducers(reducers));
}

