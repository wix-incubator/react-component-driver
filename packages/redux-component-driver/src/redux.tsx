import * as React from 'react';
import {Provider} from 'react-redux';
import {componentDriver, ComponentDriver} from 'react-component-driver';
import {Store, AnyAction, Action} from 'redux';

// TODO: do we need to hoist statics?
export function withStore<P, S, A extends Action<any>>(WrappedComponent: React.ComponentClass<P>, store: Store<S, A>) {
  return class WithStore extends React.PureComponent<P> {
    render() {
      return <Provider store={store}><WrappedComponent {...this.props}/></Provider>;
    }
  };
}

export function reduxDriver<S, A extends Action<any>>(Component: React.ComponentClass, store: Store<S, A>, methods = {}) {
  return componentDriver(withStore(Component, store), methods);
}

export class ReduxComponentDriver<P, S, A extends Action<any>> extends ComponentDriver<P> {
  constructor(component: React.ComponentClass<P>, store: Store<S, A>) {
    super(withStore(component, store));
  }
}

export * from 'react-component-driver';
