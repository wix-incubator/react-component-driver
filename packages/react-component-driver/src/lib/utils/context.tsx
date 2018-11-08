import * as React from 'react';

export default function withContext<C, P = {}, S = {}>(
  context: C,
  Component: React.ComponentClass<P, S>,
): typeof React.Component {
  return class WrappedComponent extends React.Component<P, S> implements React.ChildContextProvider<C> {
    static childContextTypes = Component.contextTypes;

    getChildContext() {
      return context;
    }

    render() {
      return <Component {...this.props}/>;
    }
  };
}
