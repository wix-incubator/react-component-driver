import {componentDriver, getTextNodes} from 'redux-component-driver';

import {Item} from './item';

export const itemDriver = componentDriver(Item, {
  getNestedID(id) {
    return this.props['data-test-id'] + '.' + id;
  },
  getTexts() {
    return [this.getIndex(), this.getText()];
  },
  getText() {
    const node = this.getByID(this.getNestedID(Item.TEST_ID.TEXT));
    return getTextNodes(node).join('');
  },
  getIndex() {
    const node = this.getByID(this.getNestedID(Item.TEST_ID.INDEX));
    return getTextNodes(node).join('');
  }
});
