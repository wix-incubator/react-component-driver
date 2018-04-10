import {componentDriver} from '../../lib/redux-full-render';
import {Form} from './form';

const {INPUT, BUTTON} = Form.TEST_ID;

export const formDriver = componentDriver(Form, {
  getNestedID(id) {
    return this.props.testID + '.' + id;
  },
  getInputValue() {
    return this.getByID(this.getNestedID(INPUT)).props.value;
  },
  setInputValue(value) {
    this.getByID(this.getNestedID(INPUT)).props.onChangeText(value);
    return this;
  },
  tapAdd() {
    this.getByID(this.getNestedID(BUTTON)).props.onPress();
    return this;
  }
});
