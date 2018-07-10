import {createAppStore} from './index';
import {stateReader} from './reader';

describe('Form Store', () => {
  let store;

  beforeEach(() => {
    store = createAppStore();
  });

  it('should start with empty input', () => {
    expect(stateReader(store.getState()).getFormInput()).to.equal('');
  });

  it('should store input value on change', () => {
    store.dispatch({type: 'onInputChange', input: 'a'});
    expect(stateReader(store.getState()).getFormInput()).to.equal('a');
  });
});
