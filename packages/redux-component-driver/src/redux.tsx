import * as React from 'react';
import {Provider} from 'react-redux';
import {componentDriver, ComponentDriver} from 'react-component-driver';
import {Store, AnyAction, Action} from 'redux';
import hoistStatics from 'hoist-non-react-statics';

type InferProps<T> = T extends React.ComponentClass<infer Props> ? Props : never;
type ReduxComponent<T> = React.ComponentClass<InferProps<T>>;

export function withStore<C extends ReduxComponent<C>, S, A extends Action<any>>(WrappedComponent: C, store: Store<S, A>) {
  const TypeAdjustedWrappedComponent = WrappedComponent as ReduxComponent<C>;

  class WithStore extends React.PureComponent<InferProps<C>> {
    render() {
      return <Provider store={store}><TypeAdjustedWrappedComponent {...this.props}/></Provider>;
    }
  };
  return hoistStatics(WithStore, WrappedComponent) as C;
}

export function reduxDriver<C extends ReduxComponent<C>, S, A extends Action<any>>(Component: C, store: Store<S, A>, methods = {}) {
  return componentDriver(withStore(Component, store), methods);
}

export class ReduxComponentDriver<P, S, A extends Action<any>> extends ComponentDriver<P> {
  constructor(component: React.ComponentClass<P>, store: Store<S, A>) {
    super(withStore(component, store));
  }
}

export * from 'react-component-driver';
