import {ChangeEvent} from 'react';

import {formDriver} from './form.driver';

describe('Form', () => {
  it('uses `testID` for container element', () => {
    const testID = Math.random().toString();
    const form = formDriver().setProps({'data-test-id': testID});
    expect(form.getByID(testID)).to.be.ok;
  });

  it('should initialize input value with `input` prop', () => {
    const input = Math.random().toString();
    const form = formDriver().setProps({input});
    expect(form.getInputValue()).to.equal(input);
  });

  it('should invoke `onInputChange` when input value changes', () => {
    const onInputChange = sinon.stub();
    const form = formDriver().setProps({onInputChange});
    form.invokeOnInputChange({target: {value: 'some value'}} as ChangeEvent<HTMLInputElement>);
    expect(onInputChange).to.be.calledWith('some value');
  });

  it('should invoke `onAdd` with input value when button is clicked', () => {
    const onAdd = sinon.stub();
    const input = Math.random().toString();
    const form = formDriver().setProps({onAdd, input}).clickAdd();
    expect(onAdd).to.be.calledWith(input);
  });
});
