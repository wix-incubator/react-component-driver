import {componentDriver, getTextNodes, ComponentDriver} from 'redux-component-driver';

import {TEST_ID, Props, Item} from './item';

class ItemDriver extends ComponentDriver<Props> {
  constructor() {
    super(Item);
  }

  getNestedID(suffix: string) {
    return this.props['data-test-id'] + '.' + suffix;
  }

  getTexts() {
    return [this.getIndex(), this.getText()];
  }

  getText() {
    const id = this.getNestedID(TEST_ID.TEXT);
    const node = this.getByID(id);
    if (node) {
      return getTextNodes(node).join('');
    }
    throw new Error(`Text not found by id ${id}.`);
  }

  getIndex() {
    const id = this.getNestedID(TEST_ID.INDEX);
    const node = this.getByID(id);
    if (node) {
      return getTextNodes(node).join('');
    }
    throw new Error(`Index not found by id ${id}.`);
  }
}

export function itemDriver() {
  return new ItemDriver();
}
