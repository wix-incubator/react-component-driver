import {createAppStore} from './index';
import {stateReader} from './reader';

describe('List Store', () => {
  it('should start with empty list', () => {
    const store = createAppStore();
    expect(stateReader(store.getState()).getListItems()).to.deep.equal([]);
  });

  it('should add new item', () => {
    const store = createAppStore();
    store.dispatch({type: 'onAddItem', item: 'hello'});
    expect(stateReader(store.getState()).getListItems()).to.deep.equal(['hello']);
  });

  it('should append new item', () => {
    const store = createAppStore();
    store.dispatch({type: 'onAddItem', item: 'hello'});
    store.dispatch({type: 'onAddItem', item: 'world'});
    expect(stateReader(store.getState()).getListItems()).to.deep.equal(['hello', 'world']);
  });
});
