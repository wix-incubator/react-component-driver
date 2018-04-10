import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class ReduxExampleWithPropTypes extends Component {
  render() {
    return <Text>{this.props.welcomeText}</Text>;
  }
}

ReduxExampleWithPropTypes.propTypes = {
  welcomeText: PropTypes.string.isRequired,
};

export default connect(state => state)(ReduxExampleWithPropTypes);
