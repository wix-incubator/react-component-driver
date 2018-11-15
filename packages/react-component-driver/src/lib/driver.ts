import {Backend, RChild, RNode, Render} from './backends/types';
import {Core} from './core';

export interface DriversI<Props> {
  ComponentDriver: new <Props>(component: React.ComponentClass<Props>) => ComponentDriverI<Props>;
  componentDriver<Props>(component: React.ComponentClass<Props>, methods?: any): () => any;
}

export interface ComponentDriverI<Props> {
  withProps(props: Partial<Props>): this;
  getComponent(): Render;
  render(): this;
  filterBy(predicate: (node: RChild) => boolean): RChild[];
  getBy(predicate: (node: RChild) => boolean): RChild | undefined;
  filterByID(id: string | RegExp): RNode[];
  getByID(id: string | RegExp): RNode | undefined;
  filterByType(type: string): RNode[];
  getByType(type: string): RNode | undefined;
}

export class BaseComponentDriver<Props, Renderer, Options> implements ComponentDriverI<Props> {
  private rendered: Render | null = null;
  private props: Partial<Props> = {};

  constructor(private core: Core<Renderer, Options>, private Component: React.ComponentClass<Props>) {
  }

  private getRendered() {
    if (this.rendered == null) {
      this.rendered = this.core.toJSON(this.core.renderComponent(this.Component, this.props as Props));
    }
    return this.rendered;
  }

  withProps(props: Partial<Props>) {
    this.props = props;
    return this;
  }

  getComponent() {
    return this.getRendered();
  }

  render() {
    this.getRendered();
    return this;
  }

  filterBy(predicate: (node: RChild) => boolean) {
    return this.core.filterBy(predicate, this.getComponent());
  }

  getBy(predicate: (node: RChild) => boolean) {
    return this.filterBy(predicate).pop();
  }

  filterByID(id: string | RegExp): RNode[] {
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
  return function factory<P>(component: React.ComponentClass<P>, methods?: any) {
    return function driver() {
      let _component: Render | null = null;
      let _props: Partial<P> = {};
      let _createNodeMock = () => null; // works only for react-test-renderer backend.

      function render() {
        if (!_component) {
          _component = toJSON(renderComponent(
            component,
            _props as P,
            {createNodeMock: _createNodeMock}
          ));
        }
        return _component;
      }

      return {
        props: {},
        attachTo(component: RNode) {
          if (!component) {
            throw new Error(
              'Expected to attach to something, got "' +
                component + '" of type ' + typeof component
            );
          }
          _component = component;
          this.props = component.props;
          return this;
        },
        withProps(props: Partial<P>) {
          this.props = _props = props;
          return this;
        },
        getComponent() {
          return render();
        },
        render() {
          render();
          return this;
        },
        filterBy(predicate: (node: RChild) => boolean) {
          return filterBy(predicate, this.getComponent());
        },
        getBy(predicate: (node: RChild) => boolean) {
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
