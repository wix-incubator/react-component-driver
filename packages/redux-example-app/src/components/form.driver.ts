import {componentDriver, ComponentDriver, RenderedNode} from 'redux-component-driver';

import {Form, Props, TEST_ID} from './form';
import {ChangeEvent} from 'redux-component-driver/node_modules/@types/react';

class FormDriver extends ComponentDriver<Props> {
  constructor() {
    super(Form);
  }

  getNestedID(id: string) {
    return this.props['data-test-id'] + '.' + id;
  }

  getInput() {
    return this.getByID(this.getNestedID(TEST_ID.INPUT));
  }

  private withInput<R>(f: (node: RenderedNode) => R) {
    const input = this.getInput();
    if (input) {
      return f(input);
    }
  }

  getInputValue() {
    return this.withInput((input) => input.props.value);
  }

  invokeOnInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.withInput((input) => input.props.onChange(event));
    return this;
  }

  clickAdd() {
    const id = this.getNestedID(TEST_ID.BUTTON);
    const button = this.getByID(id);
    if (button) {
      button.props.onClick();
      return this;
    }
    throw new Error(`Cannot find button by id ${id}`);
  }
}

export function formDriver() {
  return new FormDriver();
}
