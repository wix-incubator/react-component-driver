import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export default class ContextExample extends Component {

  static contextTypes = {
    id: PropTypes.number.isRequired,
  };

  render() {
    return <View id={this.context.id}></View>;
  }
}
