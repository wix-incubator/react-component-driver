import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

export default class FailingPropTypes extends Component {
  render() {
    return (
      <View><Text>{this.props.failureText}</Text></View>
    );
  }
}

FailingPropTypes.propTypes = {
  callback: PropTypes.func.isRequired,
  failureText: PropTypes.string.isRequired,
};
