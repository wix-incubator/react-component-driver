import React from 'react';
import {
  containerDriver as containerDriverFactory,
  componentDriver as componentDriverFactory
} from './driver';
import { navigatorMock } from './utils';
import * as backend from './shallow';

export * from './shallow';
export * from './utils';

const {render, renderComponent} = backend;

export const containerDriver = containerDriverFactory(renderContainer, backend);
export const componentDriver = componentDriverFactory(renderComponent, backend);

export function renderContainer() {
  return render(container(...arguments), true);
}

function container(comp, store, props = {}) {
  props.store = store;
  if (!props.navigator) {
    props.navigator = navigatorMock();
  }
  return React.createElement(comp, props);
}
