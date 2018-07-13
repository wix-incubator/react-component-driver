import {formDriver} from './form.driver';

describe('Form', () => {
  it('uses `testID` for container element', () => {
    const testID = Math.random().toString();
    const form = formDriver().withProps({testID});
    expect(form.getByID(testID)).to.be.truthy();
  });

  it('should initialize input value with `input` prop', () => {
    const input = Math.random().toString();
    const form = formDriver().withProps({input});
    expect(form.getInputValue()).to.equal(input);
  });

  it('should invoke `onInputChange` when input value changes', () => {
    const onInputChange = sinon.stub();
    const form = formDriver().withProps({onInputChange});
    form.invokeOnInputChange('some value');
    expect(onInputChange).to.be.calledWith('some value');
  });

  it('should invoke `onAdd` with input value when button is clicked', () => {
    const onAdd = sinon.stub();
    const input = Math.random().toString();
    const form = formDriver().withProps({onAdd, input}).clickAdd();
    expect(onAdd).to.be.calledWith(input);
  });
});
