import baseFactory from './base';
import * as reactTestRendererBackend from './backend-full-render';
import {componentDriver as driver} from './driver';

// XXX: Why this tediousness? Because ES6 modules are static.
export const {
  render,
  renderComponent,
  getTextNodes,
  filterByTestID,
  filterByType,
  filterBy
} = baseFactory(reactTestRendererBackend);
