import {ReactTestRenderer as Renderer} from 'react-test-renderer';

import * as fullRenderBackend from './lib/backends/full-render';
import {Render, Child, RenderedNode} from './lib/backends/types';
import recodr from './lib/index';
import withContext from './lib/utils/context';

type Component = Render | Renderer;

const {
  ComponentDriver,
  componentDriver,
  filterBy: _filterBy,
  filterByTestID: _filterByTestID,
  filterByType: _filterByType,
  getTextNodes: _getTextNodes,
  render,
  renderComponent,
  toJSON,
} = recodr(fullRenderBackend);

function getJSON(comp: Component): Render {
  if (comp && typeof comp === 'object' && 'toJSON' in comp) {
    return toJSON(comp);
  }
  return comp;
}

function filterBy(p: (node: Child) => boolean, comp: Component) {
  return _filterBy(p, getJSON(comp));
}

function filterByTestID(id: string | RegExp, comp: Component) {
  return _filterByTestID(id, getJSON(comp));
}

function filterByType(type: string, comp: Component) {
  return _filterByType(type, getJSON(comp));
}

function getTextNodes(comp: Component) {
  return _getTextNodes(getJSON(comp));
}

export {
  Child,
  RenderedNode,
  Component,
  ComponentDriver,
  componentDriver,
  filterBy,
  filterByTestID,
  filterByType,
  getTextNodes,
  render,
  renderComponent,
  withContext,
};
