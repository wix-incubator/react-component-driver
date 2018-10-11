import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class Example extends PureComponent {
  render() {
    return (
      <View testID={this.props.testID}>
        <Text testID="additional_text">{this.props.text}</Text>
      </View>
    );
  }
}
