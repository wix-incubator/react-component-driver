import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {componentDriver} from 'react-component-driver';

// TODO: do we need to hoist statics?
export function withStore(WrappedComponent, store) {
  return class WithStore extends Component {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
}

export function reduxDriver(Component, store, methods = {}) {
  return componentDriver(withStore(Component, store), methods);
}

export * from 'react-component-driver';
