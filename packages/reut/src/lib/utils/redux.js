import React from 'react';
import {Provider} from 'react-redux';

// TODO: do we need to hoist statics?

export function withStore(WrappedComponent, store) {
  return class WithStore extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
}
