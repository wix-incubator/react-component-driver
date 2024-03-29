import * as React from 'react';
import {Child, RenderedNode, Render} from './backends/types';
import {Core} from './core';

export interface Drivers {
  ComponentDriver: new <Props>(component: React.ComponentType<Props>) => DriveableComponent<Props>;
  componentDriver<Props, Methods>(component: React.ComponentType<Props>, methods?: ThisType<DriveableComponent<Props> & Methods> & Methods): DriveableComponent<Props> & Methods;
}

export interface DriveableComponent<Props> {
  props: Partial<Props>;
  setProps(props: Partial<Props>): this;
  getComponent(): Render;
  getComponentAsync(): Promise<Render>;
  render(): this;
  renderAsync(): Promise<this>;
  filterBy(predicate: (node: Child) => boolean): Child[];
  getBy(predicate: (node: Child) => boolean): Child | undefined;
  filterByID(id: string | RegExp): RenderedNode[];
  getByID(id: string | RegExp): RenderedNode | undefined;
  filterByType(type: string): RenderedNode[];
  getByType(type: string): RenderedNode | undefined;
  attachTo(node?: Render): this;
  unmount(): void;
}

export class BaseComponentDriver<Props, Renderer, Options> implements DriveableComponent<Props> {
  private renderer: Renderer | null = null;
  private isAttached = false;
  private attached: Render | null = null;
  props: Partial<Props> = {};

  constructor(private core: Core<Renderer, Options>, private Component: React.ComponentType<Props>) {
  }

  private getRenderer() {
    if (this.renderer == null) {
      this.renderer = this.core.renderComponent(this.Component, this.props as Props);
    }
    return this.renderer;
  }

  private async getRendererAsync() {
    if (this.renderer == null) {
      this.renderer = await this.core.renderComponentAsync(this.Component, this.props as Props);
    }
    return this.renderer;
  }

  attachTo(component?: Render) {
    this.isAttached = true;
    this.attached = component ?? null;
    this.props = component && typeof component !== 'string' && 'props' in component ? component.props as Partial<Props> : {};
    return this;
  }

  setProps(props: Partial<Props>) {
    this.props = props;
    return this;
  }

  getComponent() {
    if (this.isAttached) {
      return this.attached;
    } else {
      return this.core.toJSON(this.getRenderer());
    }
  }

  async getComponentAsync() {
    if (this.isAttached) {
      return this.attached;
    } else {
      return this.core.toJSON(await this.getRendererAsync());
    }
  }

  unmount() {
    this.core.unmount(this.getRenderer());
  }

  render() {
    this.getRenderer();
    return this;
  }

  async renderAsync() {
    await this.getRendererAsync();
    return this;
  }

  filterBy(predicate: (node: Child) => boolean) {
    return this.core.filterBy(predicate, this.getComponent());
  }

  getBy(predicate: (node: Child) => boolean) {
    return this.filterBy(predicate).pop();
  }

  filterByID(id: string | RegExp): RenderedNode[] {
    return this.core.filterByTestID(id, this.getComponent());
  }

  getByID(id: string | RegExp) {
    return this.filterByID(id).pop();
  }

  filterByType(type: string) {
    return this.core.filterByType(type, this.getComponent());
  }

  getByType(type: string) {
    return this.filterByType(type).pop();
  }
}

export function componentDriver<Renderer, Options>(core: Core<Renderer, Options>) {
  const {renderComponent, renderComponentAsync, filterBy, filterByType, filterByTestID, toJSON} = core;

  return function factory<Props, Methods extends Object>(component: React.ComponentType<Props>, methods?: Methods & ThisType<Methods & DriveableComponent<Props>>): DriveableComponent<Props> & Methods {
    let isAttached = false;
    let _renderer: Renderer | null = null;
    let _component: Render | null = null;
    let _props: Partial<Props> = {};
    let _createNodeMock = () => null; // works only for react-test-renderer backend.

    function render() {
      if (_renderer == null) {
        _renderer = renderComponent(component, _props as Props, {createNodeMock: _createNodeMock});
      }
      return _renderer;
    }

    async function asyncRender() {
      if (_renderer == null) {
        _renderer = await renderComponentAsync(component, _props as Props, {createNodeMock: _createNodeMock});
      }
      return _renderer;
    }

    const base = {
      props: {},
      attachTo(component?: RenderedNode) {
        isAttached = true;
        _component = component ?? null;
        this.props = component ? (component.props as Partial<Props>) : {};
        return this;
      },
      setProps(props: Partial<Props>) {
        this.props = _props = props;
        return this;
      },
      getComponent() {
        if (isAttached) {
          return _component;
        } else {
          return toJSON(render());
        }
      },
      async getComponentAsync() {
        if (isAttached) {
          return _component;
        } else {
          return toJSON(await asyncRender());
        }
      },
      unmount() {
        let renderer;
        if (renderer = render()) {
          core.unmount(renderer);
        }
        return this;
      },
      render() {
        render();
        return this;
      },
      async renderAsync() {
        await asyncRender();
        return this;
      },
      filterBy(predicate: (node: Child) => boolean) {
        return filterBy(predicate, this.getComponent());
      },
      getBy(predicate: (node: Child) => boolean) {
        return this.filterBy(predicate)[0];
      },
      filterByID(id: string | RegExp) {
        return filterByTestID(id, this.getComponent());
      },
      getByID(id: string | RegExp) {
        return this.filterByID(id)[0];
      },
      filterByType(type: string) {
        return filterByType(type, this.getComponent());
      },
      getByType(type: string) {
        return this.filterByType(type)[0];
      },
    };

    return Object.assign(base, methods);
  };
}
