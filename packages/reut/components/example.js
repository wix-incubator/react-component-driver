import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hide() {
    this.setState({hide: true});
  }

  render() {
    return (
      <View>
        <View testID="button" onPress={this.hide.bind(this)}></View>
        {this.state.hide ? <Text/> : <Text testID="welcome_text">{this.props.welcomeText}</Text>}
      </View>
    );
  }
}
