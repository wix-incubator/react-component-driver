import {createAppState} from './index';

describe('State', () => {
  let getters, setters;

  beforeEach(() => {
    const state = createAppState();
    getters = state.getters;
    setters = state.setters;
  });

  describe('Form', () => {
    it('should start with empty input', () => {
      expect(getters.getInput()).to.equal('');
    });

    it('should store input value on change', () => {
      setters.setInput('a');
      expect(getters.getInput()).to.equal('a');
    });
  });

  describe('List', () => {
    it('should start with empty list', () => {
      expect(getters.getItems()).to.deep.equal([]);
    });

    it('should add new item', () => {
      setters.addItem('hello');
      expect(getters.getItems()).to.deep.equal(['hello']);
    });

    it('should append new item', () => {
      setters.addItem('hello');
      setters.addItem('world');
      expect(getters.getItems()).to.deep.equal(['hello', 'world']);
    });
  });

});
