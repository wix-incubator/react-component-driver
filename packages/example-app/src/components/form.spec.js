import {formDriver} from './form.driver';

describe('Form', () => {
  it('uses `testID` for container element', () => {
    const testID = Math.random().toString();
    const form = formDriver().withProps({testID});
    expect(form.getByID(testID)).to.be.truthy();
  });

  it('should initialize input value with `value` prop', () => {
    const value = Math.random().toString();
    const form = formDriver().withProps({value});
    expect(form.getInputValue()).to.equal(value);
  });

  it('should invoke `onAdd` callback with value of input field', () => {
    const onAdd = sinon.stub();
    const value = Math.random().toString();
    const form = formDriver().withProps({onAdd}).setInputValue(value).tapAdd();
    expect(onAdd).to.be.calledWith(value);
  });
});
