// import {createAppStore} from './index';
// import {stateReader} from './reader';

// describe('List Store', () => {
//   let store;

//   beforeEach(() => {
//     store = createAppStore();
//   });

//   it('should start with empty list', () => {
//     expect(stateReader(store.getState()).getListItems()).to.deep.equal([]);
//   });

//   it('should add new item', () => {
//     store.dispatch({type: 'onAddItem', item: 'hello'});
//     expect(stateReader(store.getState()).getListItems()).to.deep.equal(['hello']);
//   });

//   it('should append new item', () => {
//     store.dispatch({type: 'onAddItem', item: 'hello'});
//     store.dispatch({type: 'onAddItem', item: 'world'});
//     expect(stateReader(store.getState()).getListItems()).to.deep.equal(['hello', 'world']);
//   });
// });
