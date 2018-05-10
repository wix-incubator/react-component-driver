import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

export default function navigationEventLogging(eventLog) {
  class NavExample extends PureComponent {
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
      eventLog.push(event);
    }

    render() {
      return <View></View>;
    }
  }

  return connect(state => state)(NavExample);
}
