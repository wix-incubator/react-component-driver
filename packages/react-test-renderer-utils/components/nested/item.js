import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';

export class Item extends PureComponent {
  static TEST_ID = {
    TEXT: 'text',
    INDEX: 'index',
  };

  render() {
    return (
      <View testID={this.props.testID}>
        <Text testID={this.props.testID + '.' + Item.TEST_ID.INDEX}>
          {this.props.index}
        </Text>
        <Text>. </Text>
        <Text testID={this.props.testID + '.' + Item.TEST_ID.TEXT}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}
