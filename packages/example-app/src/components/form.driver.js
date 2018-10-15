import {componentDriver} from 'react-component-driver';
import {Form} from './form';

const {INPUT, BUTTON} = Form.TEST_ID;

export const formDriver = componentDriver(Form, {
  getNestedID(id) {
    const testID = this.props.testID || this.props['data-test-id'];
    return testID + '.' + id;
  },
  getInput() {
    return this.getByID(this.getNestedID(INPUT));
  },
  getInputValue() {
    return this.getInput().props.value;
  },
  setInputValue(value) {
    this.getInput().props.onChange(value);
    return this;
  },
  tapAdd() {
    this.getByID(this.getNestedID(BUTTON)).props.onClick();
    return this;
  }
});
