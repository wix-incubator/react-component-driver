import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
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

class _ImperativeContainer extends Component {
  render() {
    return (
      <View>
        <TextInput ref={ref => this.input = ref}>{this.props.welcomeText}</TextInput>
        <TouchableOpacity testID="Button" onPress={() => this.input.focus()}>
          <View>Button</View>
        </TouchableOpacity>
        <Footer testID="header" text="Amazing Header"/>
        <Footer testID="footer" text="(c) 2017"/>
      </View>
    );
  }
}

export const ImperativeContainer =
  connect(state => state)(_ImperativeContainer);
