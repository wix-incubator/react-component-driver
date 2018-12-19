import {Child, getTextNodes, ComponentDriver} from 'redux-component-driver';

import {List, Props, TEST_ID} from './list';
import {itemDriver} from './item.driver';

const isItem = (node: Child) => {
  if (node && typeof node === 'object') {
    const testID = node && node.props && node.props['data-test-id'];
    return /\.item-\d+$/.test(testID);
  }
  return false;
};

class ListDriver extends ComponentDriver<Props> {
  constructor() {
    super(List);
  }

  getNestedID(id: string) {
    return this.props['data-test-id'] + '.' + id;
  }

  getItemsContainer() {
    return this.getByID(this.getNestedID(TEST_ID.ITEMS));
  }

  getItems() {
    return this.filterBy(isItem)
      .map((node) => itemDriver().attachTo(node).getTexts());
  }

  getItem(n: number) {
    const node = this.getByID(this.getNestedID(TEST_ID.ITEM(n)));
    if (node) {
      return itemDriver().attachTo(node).getTexts();
    }
    throw new Error(`Cannot find item number ${n}.`)
  }

  getEmptyStateText() {
    const node = this.getByID(this.getNestedID(TEST_ID.EMPTY));
    if (node) {
      return getTextNodes(node).join('');
    }
    throw new Error(`No empty state by id ${TEST_ID.EMPTY}.`);
  }
}

export function listDriver() {
  return new ListDriver();
}
