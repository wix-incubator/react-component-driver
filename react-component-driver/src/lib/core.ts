import * as React from 'react';
import {act} from 'react-test-renderer';
import queryFactory, {Queries} from './query';
import {Backend, Render, Child} from './backends/types';

export interface Core<Renderer, Options> extends Queries {
  toJSON(renderer: Renderer): Render;
  render<P>(element: React.ReactElement<P>, options?: Options): Renderer;
  renderAsync<P>(element: React.ReactElement<P>, options?: Options): Promise<Renderer>;
  renderComponent<P>(comp: React.ComponentType<P>, props: P, ...rest: any[]): Renderer;
  renderComponentAsync<P>(comp: React.ComponentType<P>, props: P, ...rest: any[]): Promise<Renderer>;
  unmount(renderer: Renderer): void;
}

async function inAct<T>(callback: () => T): Promise<T> {
  let result: T;
  await act(async () => {
    result = callback();
    // Two cycles should hopefully help with most of the async rendering cases.
    // @ts-ignore
    await new Promise((resolve) => setTimeout(resolve));
    // @ts-ignore
    await new Promise((resolve) => setTimeout(resolve));
  });
  // @ts-ignore
  return result;
}

export default function core<Renderer, Options>(backend: Backend<Renderer, Options>): Core<Renderer, Options> {
  const {render, toJSON, unmount} = backend;

  async function renderAsync<P>(element: React.ReactElement<P>, options?: Options) {
    return await inAct(() => render(element, options));
  }

  function renderComponent<P>(comp: React.ComponentType<P>, props: P, ...rest: any[]) {
    return render(React.createElement(comp, props), ...rest);
  }

  async function renderComponentAsync<P>(comp: React.ComponentType<P>, props: P, ...rest: any[]) {
    return await inAct(() => render(React.createElement(comp, props), ...rest));
  }

  return {
    toJSON,
    render,
    renderAsync,
    renderComponent,
    renderComponentAsync,
    unmount,
    ...queryFactory(backend),
  };
};
