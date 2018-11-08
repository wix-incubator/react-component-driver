import * as React from 'react';
import {create, ReactTestRenderer as Renderer, TestRendererOptions as Options} from 'react-test-renderer';
import {Render, Child, render_map} from './types';

export function render<P = {}>(reactElement: React.ReactElement<P>, options?: Options): Renderer {
  return create(reactElement, options);
}

export function toJSON(component: Render | Renderer): Render {
  if (typeof component === 'object' && component && 'toJSON' in component) {
    return render_map(component.toJSON() as Render, x => x);
  }
  return component;
}
