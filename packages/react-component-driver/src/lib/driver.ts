import {Backend, Child, RenderedNode, Render} from './backends/types';
import {Core} from './core';
import {Component} from '../shallow';

export interface DriversI<Props> {
  ComponentDriver: new <Props>(component: React.ComponentType<Props>) => ComponentDriverI<Props>;
  componentDriver<Props>(component: React.ComponentType<Props>, methods?: any): () => any;
}

export interface ComponentDriverI<Props> {
  props: Partial<Props>;
  withProps(props: Partial<Props>): this;
  getComponent(): Render;
  render(): this;
  filterBy(predicate: (node: Child) => boolean): Child[];
  getBy(predicate: (node: Child) => boolean): Child | undefined;
  filterByID(id: string | RegExp): RenderedNode[];
  getByID(id: string | RegExp): RenderedNode | undefined;
  filterByType(type: string): RenderedNode[];
  getByType(type: string): RenderedNode | undefined;
  attachTo(node: Child): this;
  unmount(): void;
}

export class BaseComponentDriver<Props, Renderer, Options> implements ComponentDriverI<Props> {
  private renderer: Renderer | null = null;
  private attached: Child | null = null;
  props: Partial<Props> = {};

  constructor(private core: Core<Renderer, Options>, private Component: React.ComponentType<Props>) {
  }

  private getRenderer() {
    if (this.renderer == null) {
      this.renderer = this.core.renderComponent(this.Component, this.props as Props);
    }
    return this.renderer;
  }

  attachTo(component: Child) {
    this.attached = component;
    this.props = typeof component === 'string' ? {} : component.props as Partial<Props>;
    return this;
  }

  withProps(props: Partial<Props>) {
    this.props = props;
    return this;
  }

  getComponent() {
    if (this.attached) {
      return this.attached;
    } else {
      return this.core.toJSON(this.getRenderer());
    }
  }

  unmount() {
    this.core.unmount(this.getRenderer());
  }

  render() {
    this.getRenderer();
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
  const {renderComponent, filterBy, filterByType, filterByTestID, toJSON} = core;
  return function factory<P>(component: React.ComponentType<P>, methods?: any) {
    return function driver() {
      let isAttached = false;
      let _renderer: Renderer | null = null;
      let _component: Render | null = null;
      let _props: Partial<P> = {};
      let _createNodeMock = () => null; // works only for react-test-renderer backend.

      function render() {
        if (!_renderer && component) {
          _renderer = renderComponent(
            component,
            _props as P,
            {createNodeMock: _createNodeMock}
          );
        }
        return _renderer;
      }

      return {
        props: {},
        attachTo(component: RenderedNode) {
          if (!component) {
            throw new Error(
              'Expected to attach to something, got "' +
                component + '" of type ' + typeof component
            );
          }
          isAttached = true;
          _component = component;
          this.props = component.props;
          return this;
        },
        withProps(props: Partial<P>) {
          this.props = _props = props;
          return this;
        },
        getComponent() {
          if (isAttached) {
            return _component;
          }
          const renderer = render();
          if (renderer) {
            return toJSON(renderer);
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
        ...methods
      };
    };
  };
}
