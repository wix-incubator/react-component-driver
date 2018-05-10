jest.useFakeTimers();

import Example from '../components/example';
import ReduxExample from '../components/redux-example';
import NavExample from '../components/nav-example';
import {ImperativeContainer} from '../components/imperative';
import * as ez from '../lib/shallow';
import * as ezr from '../lib/redux-shallow';
import * as rtr from '../lib/redux-full-render';

describe('Driver', function () {
  [
    [ez, '/', false],
    [ezr, '/redux', true],
    [rtr, '/full-render', true]
  ].forEach(([toolkit, name, hasContainer]) => {
    const cases = [['Component', Example, toolkit => toolkit.componentDriver]];
    if (hasContainer) {
      cases.push([
        'Container', ReduxExample,
        ({containerDriver, getStore}) =>
          (component, methods) =>
            containerDriver(component, (initialState) => getStore(state => state, initialState), methods)
      ]);
    }
    cases.forEach(([type, component, getDriverFactory]) => {
      describe('For ' + type + ' From ' + name, function () {
        const example = (getDriverFactory(toolkit))(component, {
          getText() {
            return this.getByType('Text').children;
          },
        });

        it('should allow to set props', function () {
          expect(example().withProps({welcomeText: 'Hello'}).getText())
            .toEqual(['Hello']);
        });

        it('should allow to wait', function () {
          const f = jest.fn();
          setTimeout(f, 100);
          const drv = example();
          expect(f).not.toBeCalled();
          drv.wait();
          expect(f).toBeCalled();
        });

        it('should allow to wait for particular period of time', function () {
          const f = jest.fn();
          setTimeout(f, 100);
          const drv = example().wait(99);
          expect(f).not.toBeCalled();
          drv.wait(1);
          expect(f).toBeCalled();
        });

        it('should allow to quickly fetch by id', () => {
          expect(example().getByID('welcome_text')).toBeDefined();
          expect(example().filterByID('welcome_text').length).toBe(1);
        });

        it('should throw when trying to get by missing id', () => {
          expect(() => example().getByID()).toThrow();
          expect(() => example().filterByID()).toThrow();
        });

        it('should throw when trying to get by missing type', () => {
          expect(() => example().getByType()).toThrow();
          expect(() => example().filterByType()).toThrow();
        });
      });
    });
  });

  [
    [ezr, '/redux'],
    [rtr, '/full-render']
  ].forEach(([toolkit, name]) => {
    describe('containerDriver from ' + name, () => {
      const {filterByType, containerDriver, getStore} = toolkit;
      const makeStore = state => getStore(state => state, state);
      const eventLog = [];

      const example = containerDriver(ReduxExample, makeStore, {
        getText() {
          return this.getByType('Text').children;
        }
      });

      const navExample = containerDriver(NavExample(eventLog), makeStore);

      beforeEach(() => {
        eventLog.splice(0);
      });

      it('should allow to set state', function () {
        expect(example().withState({welcomeText: 'Hello'}).getText())
          .toEqual(['Hello']);
      });

      it('should allow to spy on store.dispatch()', function () {
        const store = example().getStore();
        store.dispatch({type: 'A'});
        expect(store.dispatch).toBeCalledWith({type: 'A'});
      });

      it('should supply shorthand method for emitting navigator events', function () {
        navExample().render().emit('hello').emit('world', 'CustomType');
        expect(eventLog).toEqual([
          {id: 'hello', type: 'NavBarButtonPress'},
          {id: 'world', type: 'CustomType'},
        ]);
      });

      describe('Navigation Shorthands', () => {
        it('should emit "willAppear"', () => {
          navExample().render().emitWillAppear();
          expect(eventLog).toEqual([
            {id: 'willAppear', type: 'ScreenChangedEvent'},
          ]);
        });

        it('should emit "didDisappear"', () => {
          navExample().render().emitDidDisappear();
          expect(eventLog).toEqual([
            {id: 'didDisappear', type: 'ScreenChangedEvent'},
          ]);
        });

        it('should emit "didAppear"', () => {
          navExample().render().emitDidAppear();
          expect(eventLog).toEqual([
            {id: 'didAppear', type: 'ScreenChangedEvent'},
          ]);
        });

        it('should emit "willDisappear"', () => {
          navExample().render().emitWillDisappear();
          expect(eventLog).toEqual([
            {id: 'willDisappear', type: 'ScreenChangedEvent'},
          ]);
        });
      });
    });
  });

  describe('for container with react test renderer', function () {
    jest.mock('TouchableOpacity', () => 'TouchableOpacity');
    jest.mock('TextInput', () => 'TextInput');

    const {containerDriver, componentDriver, filterByTestID, getStore} = rtr;
    const makeStore = state => getStore(state => state, state);

    const footer = componentDriver(
      null, // not necessary to provide component constructor
      {
        getText() {
          return this.getByID('additional_text').children.join('');
        }
      }
    );

    const header = containerDriver(
      null, // not necessary to provide component constructor
      makeStore,
      {
        getText() {
          return this.getByID('additional_text').children.join('');
        }
      }
    );

    const imperative = containerDriver(ImperativeContainer, makeStore, {
      pressButton() {
        this.getByID('Button').props.onPress();
        return this;
      },
      getFooter() {
        return footer().attachTo(this.getByID('footer'));
      },
      getHeader() {
        return header().attachTo(this.getByID('header'));
      },
      getMissingInContainer() {
        return header().attachTo(this.getByID(Math.random()));
      },
      getMissingInComponent() {
        return footer().attachTo(this.getByID(Math.random()));
      }
    });

    it('should allow to mock nodes', function () {
      const focus = jest.fn();
      imperative()
        .withNodeMocker(() => ({focus}))
        .pressButton();
      expect(focus).toBeCalled();
    });

    it('should support nested container drivers', () => {
      expect(imperative().getHeader().getText())
        .toEqual('Amazing Header');
    });

    it('should complain about attaching to nothing (container)', () => {
      expect(() => imperative().getMissingInContainer())
        .toThrow('Expected to attach to something');
    });

    it('should support nested component drivers', () => {
      expect(imperative().getFooter().getText())
        .toEqual('(c) 2017');
    });

    it('should complain about attaching to nothing (component)', () => {
      expect(() => imperative().getMissingInComponent())
        .toThrow('Expected to attach to something');
    });
  });
});
