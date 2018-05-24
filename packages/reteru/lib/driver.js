import {navigatorMock} from './utils/navigator';

const timeMethods = {
  wait(ms) {
    if (ms !== undefined) {
      jest.runTimersToTime(ms);
    } else {
      jest.runAllTimers();
    }
    return this;
  },
  tick() {
    jest.runAllTicks();
    return this;
  }
};

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

export function componentDriver(renderComponent, backend) {
  return function factory(component, methods = {}) {
    return function driver() {
      let _component;
      let _props = {};

      function render() {
        if (!_component) {
          _component = renderComponent(component, _props);
        }
        return _component;
      }

      return {
        props: {},
        attachTo(component) {
          if (!component) {
            throw new Error(
              'Expected to attach to something, got "' +
                component + '" of type' + typeof component
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
        ...timeMethods,
        ...queryMethods(backend),
        ...methods
      };
    };
  };
}

export function containerDriver(renderContainer, backend) {
  return function factory(component, storeWithState, methods = {}) {
    return function driver() {
      let _component;
      let _store;
      let _props = {};
      let _state = {};
      let _createNodeMock = () => null; // works only for react-test-renderer backend.
      const navigator = navigatorMock();

      function getStore() {
        if (!_store) {
          _store = storeWithState(_state);
          _store.dispatch = jest.fn(_store.dispatch.bind(_store));
        }
        return _store;
      }

      function render() {
        if (!_component) {
          _component = renderContainer(
            component,
            getStore(),
            {..._props, navigator},
            {createNodeMock: _createNodeMock}
          );
        }
        return _component;
      }

      return {
        attachTo(component) {
          if (!component) {
            throw new Error(
              'Expected to attach to something, got "' +
              component + '" of type' + typeof component
            );
          }
          _component = component;
          return this;
        },
        withProps(props) {
          _props = props;
          return this;
        },
        withState(state) {
          _state = state;
          return this;
        },
        withNodeMocker(createNodeMock) {
          _createNodeMock = createNodeMock;
          return this;
        },
        getNavigator() {
          return navigator;
        },
        getStore() {
          return getStore();
        },
        getState() {
          return this.getStore().getState();
        },
        getComponent() {
          return render();
        },
        render() {
          this.getComponent();
          return this;
        },
        emit(id, type = 'NavBarButtonPress') {
          this.render();
          const nav = this.getNavigator();
          nav.emitEvent(nav.createEvent(id, type));
          return this;
        },
        emitWillAppear() {
          return this.emit('willAppear', 'ScreenChangedEvent');
        },
        emitDidDisappear() {
          return this.emit('didDisappear', 'ScreenChangedEvent');
        },
        emitDidAppear() {
          return this.emit('didAppear', 'ScreenChangedEvent');
        },
        emitWillDisappear() {
          return this.emit('willDisappear', 'ScreenChangedEvent');
        },
        ...timeMethods,
        ...queryMethods(backend),
        ...methods
      };
    };
  };
}
