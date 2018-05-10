jest.mock('TouchableOpacity', () => 'TouchableOpacity');

import {formDriver} from '../../components/nested/form-driver';

describe('Form', () => {
  it('should set `testID` for container element', () => {
    const testID = Math.random().toString();
    const form = formDriver().withProps({testID});
    expect(form.getByID(testID)).toBeDefined();
  });

  it('should initialize input value with `value` prop', () => {
    const value = Math.random().toString();
    const form = formDriver().withProps({value});
    expect(form.getInputValue()).toBe(value);
  });

  it('should invoke `onAdd` callback with value of input field', () => {
    const onAdd = jest.fn();
    const value = Math.random().toString();
    const form = formDriver().withProps({onAdd}).setInputValue(value).tapAdd();
    expect(onAdd).toBeCalledWith(value);
  });
});
