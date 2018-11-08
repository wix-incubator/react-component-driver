import {Backend, Child, ChildNode, Render} from './backends/types';
import {Core} from './core';

export function componentDriver<Renderer, Options>(core: Core<Renderer, Options>) {
  const {renderComponent, filterBy, filterByType, filterByTestID} = core;
  return function factory<P>(component: React.ComponentClass<P>, methods?: any) {
    return function driver() {
      let _component: Renderer | Render | null = null;
      let _props: Partial<P> = {};
      let _createNodeMock = () => null; // works only for react-test-renderer backend.

      function render() {
        if (!_component) {
          _component = renderComponent(
            component,
            _props as P,
            {createNodeMock: _createNodeMock}
          );
        }
        return _component;
      }

      return {
        props: {},
        attachTo(component: ChildNode) {
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
