import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Footer from './footer';

export class ImperativeComponent extends Component {
  render() {
    return (
      <View>
        <TextInput ref={ref => this.input = ref}>{this.props.welcomeText}</TextInput>
        <TouchableOpacity testID="Button" onPress={() => this.input.focus()}>
          <View>Button</View>
        </TouchableOpacity>
      </View>
    );
  }
}
