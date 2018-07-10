jest.useFakeTimers();

import Example from '../components/example';
import ReduxExample from '../components/redux-example';
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

        it('should allow to quickly fetch by id', () => {
          expect(example().getByID('welcome_text')).toBeDefined();
          expect(example().filterByID('welcome_text').length).toBe(1);
        });

        it('should allow to fetch by id, using regular expression', () => {
          expect(example().getByID(/^welcome.+$/)).toBeDefined();
          expect(example().filterByID(/^welcome.+$/).length).toBe(1);
        });

        it('should throw when trying to get by missing id', () => {
          expect(() => example().getByID()).toThrow();
          expect(() => example().filterByID()).toThrow();
        });

        it('should throw when trying to get by missing type', () => {
          expect(() => example().getByType()).toThrow();
          expect(() => example().filterByType()).toThrow();
        });

        it('should allow to filter and get by custom predicate', () => {
          expect(
            example().withProps({welcomeText: 'hi'})
              .filterBy((node) => node === 'hi')
          ).toEqual(['hi']);
          expect(
            example().withProps({welcomeText: 'hey'})
              .getBy((node) => node === 'hey')
          ).toEqual('hey');
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

      const example = containerDriver(ReduxExample, makeStore, {
        getText() {
          return this.getByType('Text').children;
        }
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
