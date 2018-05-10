import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
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
    <View key={i}>
      <Item testID={this.getTestID('item-' + i)} index={i + 1} text={item}/>
    </View>
  );

  render () {
    const {items, testID} = this.props;
    return (
      <View testID={testID}>
        {
          items.length ?
          <View testID={this.getTestID(List.TEST_ID.ITEMS)}>{items.map(this.renderItem)}</View> :
          <View testID={this.getTestID(List.TEST_ID.EMPTY)}><Text>No items yet.</Text></View>
        }
      </View>
    );
  }
}
