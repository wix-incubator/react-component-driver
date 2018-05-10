import baseFactory from './base';
import * as shallowBackend from './backend-shallow';
import {componentDriver as driver} from './driver';

// XXX: Why this tediousness? Because ES6 modules are static.
export const {
  render,
  renderComponent,
  getTextNodes,
  filterByTestID,
  filterByType,
  filterBy,
  matchers
} = baseFactory(shallowBackend);

export const componentDriver = driver(renderComponent, {
  render,
  renderComponent,
  getTextNodes,
  filterByTestID,
  filterByType,
  filterBy,
  matchers
});
