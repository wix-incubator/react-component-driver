import React, {PureComponent} from 'react';
import {Item} from './item';

export class List extends PureComponent {
  static defaultProps = {
    items: []
  };

  static TEST_ID = {
    EMPTY: 'empty',
    ITEMS: 'items',
    ITEM: (i) => 'item-' + i
  };

  getTestID = (suffix) =>
    this.props.testID + '.' + suffix;

  renderItem = (item, i) => (
    <li key={i}>
      <Item testID={this.getTestID('item-' + i)} index={i + 1} text={item}/>
    </li>
  );

  renderContent = (items) => {
    if (items.length > 0) {
      return (
        <ul data-test-id={this.getTestID(List.TEST_ID.ITEMS)}>
          {items.map(this.renderItem)}
        </ul>
      );
    }
    return (
      <div data-test-id={this.getTestID(List.TEST_ID.EMPTY)}>
        No items yet.
      </div>
    );
  }

  render () {
    const {items, testID} = this.props;
    return (
      <div data-test-id={testID}>
        {this.renderContent(items)}
      </div>
    );
  }
}
