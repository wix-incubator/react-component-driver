import * as React from 'react';
import queryFactory from './query';
import {Backend, Render, Child} from './backends/types';

export interface Core<Renderer, Options> {
  getTextNodes(tree: Render): Child[];
  filterByTestID(id: string | RegExp, tree: Render): Child[];
  filterByType(type: string, tree: Render): Child[];
  filterBy(predicate: (node: Child) => boolean, tree: Render): Child[];
  render<P>(element: React.ReactElement<P>, options?: Options | undefined): Renderer;
  renderComponent<P>(comp: React.ComponentClass<P>, props: P, ...rest: any[]): Renderer;
}

export default function core<Renderer, Options>(backend: Backend<Renderer, Options>): Core<Renderer, Options> {
  const {render, toJSON} = backend;

  function renderComponent<P>(comp: React.ComponentClass<P>, props: P, ...rest: any[]) {
    return render(React.createElement(comp, props), ...rest);
  }

  return {
    render,
    renderComponent,
    ...queryFactory(backend),
  };
};
