import {Store} from 'redux';
import {State, createAppStore} from './index';
import {stateReader} from './reader';
import {FormState, FormAction} from './form';

describe('Form Store', () => {
  it('should start with empty input', () => {
    const store = createAppStore();
    expect(stateReader(store.getState()).getFormInput()).to.equal('');
  });

  it('should store input value on change', () => {
    const store = createAppStore();
    store.dispatch({type: 'onInputChange', input: 'a'});
    expect(stateReader(store.getState()).getFormInput()).to.equal('a');
  });
});
