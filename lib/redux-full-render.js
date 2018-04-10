import React from 'react';
import { Provider } from 'react-redux';
import {
  containerDriver as containerDriverFactory,
  componentDriver as componentDriverFactory
} from './driver';
import { navigatorMock } from './utils';
import * as backend from './full-render';

export * from './full-render';
export * from './utils';

const { render, renderComponent } = backend;

export const containerDriver = containerDriverFactory(renderContainer, backend);
export const componentDriver = componentDriverFactory(renderComponent, backend);

export function renderContainer(comp, state, props, ...rest) {
  return render(container(comp, state, props), ...rest);
}

function container(comp, store, props = {}) {
  if (!props.navigator) {
    props.navigator = navigatorMock();
  }
  return <Provider store={store}>{React.createElement(comp, props)}</Provider>;
}
