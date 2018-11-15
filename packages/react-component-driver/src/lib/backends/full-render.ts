import * as React from 'react';
import {create, ReactTestRenderer as Renderer, TestRendererOptions as Options} from 'react-test-renderer';
import {Render, RChild, render_map} from './types';

export function render<P = {}>(reactElement: React.ReactElement<P>, options?: Options): Renderer {
  return create(reactElement, options);
}

export function toJSON(component: Renderer): Render {
  return render_map(component.toJSON() as Render, x => x);
}
