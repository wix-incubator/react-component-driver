import {componentDriver, getTextNodes, filterBy} from 'reteru/full-render';
import {List} from './list';
import {itemDriver} from './item.driver';

const itemTestID = (node) => {
  const testID = node && node.props && node.props['data-test-id'];
  return /\.item-\d+$/.test(testID);
};

export const listDriver = componentDriver(List, {
  getNestedID(id) {
    return this.props['data-test-id'] + '.' + id;
  },
  getItemsContainer() {
    return this.getByID(this.getNestedID(List.TEST_ID.ITEMS));
  },
  getItems() {
    const container = this.getItemsContainer();
    if (container) {
      return filterBy(itemTestID, container)
        .map((node) => itemDriver().attachTo(node).getTexts());
    } else {
      return [];
    }
  },
  getItem(n) {
    const node = this.getByID(this.getNestedID(List.TEST_ID.ITEM(n)));
    return itemDriver().attachTo(node).getTexts();
  },
  getEmptyStateText() {
    return getTextNodes(this.getByID(this.getNestedID(List.TEST_ID.EMPTY))).join('');
  }
});
