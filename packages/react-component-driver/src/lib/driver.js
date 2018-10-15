function guard(arg, name) {
  if (!arg) {
    throw new Error(`Expecting ${name}, got ${arg} of type ${typeof arg}`);
  }
}

function queryMethods({filterBy, filterByType, filterByTestID}) {
  return {
    filterBy(predicate) {
      return filterBy(predicate, this.getComponent());
    },
    getBy(predicate) {
      return this.filterBy(predicate)[0];
    },
    filterByID(id) {
      guard(id, 'testID');
      return filterByTestID(id, this.getComponent());
    },
    getByID(id) {
      guard(id, 'testID');
      return this.filterByID(id)[0];
    },
    filterByType(type) {
      guard(type, 'type');
      return filterByType(type, this.getComponent());
    },
    getByType(type) {
      guard(type, 'type');
      return this.filterByType(type)[0];
    }
  };
}

export function componentDriver(backend) {
  const {renderComponent} = backend;

  return function factory(component, methods = {}) {
    return function driver() {
      let _component;
      let _props = {};
      let _createNodeMock = () => null; // works only for react-test-renderer backend.

      function render() {
        if (!_component) {
          _component = renderComponent(
            component,
            _props,
            {createNodeMock: _createNodeMock}
          );
        }
        return _component;
      }

      return {
        props: {},
        attachTo(component) {
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
        withProps(props) {
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
        withNodeMocker(createNodeMock) {
          _createNodeMock = createNodeMock;
          return this;
        },
        ...queryMethods(backend),
        ...methods
      };
    };
  };
}