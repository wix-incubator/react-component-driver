import * as React from 'react';

import {Item} from './item';

export interface Props {
  'data-test-id': string;
  items: string[];
}

export const TEST_ID = {
  EMPTY: 'empty',
  ITEMS: 'items',
  ITEM: (i: number) => 'item-' + i
};

export class List extends React.PureComponent<Props> {
  static defaultProps = {
    items: []
  };

  getTestID = (suffix: string) =>
    this.props['data-test-id'] + '.' + suffix;

  renderItem = (item: string, i: number) => (
    <li key={i}>
      <Item data-test-id={this.getTestID(TEST_ID.ITEM(i))} index={(i + 1).toString()} text={item}/>
    </li>
  );

  renderContent = (items: string[]) => {
    if (items.length > 0) {
      return (
        <ul data-test-id={this.getTestID(TEST_ID.ITEMS)}>
          {items.map(this.renderItem)}
        </ul>
      );
    }
    return (
      <div data-test-id={this.getTestID(TEST_ID.EMPTY)}>
        No items yet.
      </div>
    );
  }

  render () {
    const {items, 'data-test-id': testID} = this.props;
    return (
      <div data-test-id={testID}>
        {this.renderContent(items)}
      </div>
    );
  }
}
