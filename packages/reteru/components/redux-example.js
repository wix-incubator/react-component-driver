import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ReduxExample extends Component {
  render() {
    return (
      <View>
        <Text testID="welcome_text">{this.props.welcomeText}</Text>
      </View>
    );
  }
}

export default connect(state => state)(ReduxExample);
