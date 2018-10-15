import React, {Component} from 'react';

export default function withContext(Wrapped, context) {
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
