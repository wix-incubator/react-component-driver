import * as React from 'react';
import queryFactory, {Queries} from './query';
import {Backend, Render, RChild} from './backends/types';

export interface Core<Renderer, Options> extends Queries {
  toJSON(renderer: Renderer): Render;
  render<P>(element: React.ReactElement<P>, options?: Options | undefined): Renderer;
  renderComponent<P>(comp: React.ComponentClass<P>, props: P, ...rest: any[]): Renderer;
}

export default function core<Renderer, Options>(backend: Backend<Renderer, Options>): Core<Renderer, Options> {
  const {render, toJSON} = backend;

  function renderComponent<P>(comp: React.ComponentClass<P>, props: P, ...rest: any[]) {
    return render(React.createElement(comp, props), ...rest);
  }

  return {
    toJSON,
    render,
    renderComponent,
    ...queryFactory(backend),
  };
};
