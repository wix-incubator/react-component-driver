import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Example extends Component {
  render() {
    return (
      <View>
        {'Hello'}
        {false}
        {null}
        {undefined}
      </View>
    );
  }
}
