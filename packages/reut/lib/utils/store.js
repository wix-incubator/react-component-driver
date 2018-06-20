import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export function getStore(reducers, state = {}) {
  const reducer = typeof reducers === 'function' ? reducers : combineReducers(reducers);
  const store = applyMiddleware(thunk)(createStore)(reducer, state);
  store.dispatch = jest.fn(store.dispatch.bind(store));
  return store;
}
