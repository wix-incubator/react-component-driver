import React, {Component} from 'react';

export * from './navigator';
export * from './store';

export function component(comp, props = {}) {
  return React.createElement(comp, props);
}

export function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve);
    if (setTimeout && setTimeout.mock) {
      jest.runAllTimers();
    }
  });
}

export function withContext(Wrapped, context) {
  return class extends Component {
    static childContextTypes = Wrapped.contextTypes;

    getChildContext() {
      return context;
    }

    render() {
      return <Wrapped {...this.props}/>;
    }
  };
}
