import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export class ContextExample extends React.Component {

  static contextTypes = {
    id: PropTypes.number.isRequired,
  };

  render() {
    return <View id={this.context.id}></View>;
  }
}
