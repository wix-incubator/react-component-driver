jest.useFakeTimers();
jest.mock('Text', () => 'Text');
jest.mock('View', () => 'View');

import Example from './components/example';
import * as shallow from '../shallow';
import * as full from '../index';

describe('Driver', function () {
  [
    [shallow, '/'],
    [full, '/full-render'],
  ].forEach(([{componentDriver}, name]) => {
    describe('For Component From ' + name, function () {
      const example = () => componentDriver(Example, {
        getText() {
          return this.getByType('Text').children;
        },
      });

      it('should render component', function () {
        const welcomeText = 'Hello, World!';
        const drv = example().setProps({welcomeText});
        expect(drv.filterBy(() => true)[0]).toEqual({
          type: 'View',
          props: {},
          children: [
            {
              type: 'View',
              props: {testID: 'button', onPress: expect.any(Function)},
              children: []
            },
            {
              type: 'Text',
              props: {testID: 'welcome_text'},
              children: [welcomeText]
            },
          ]
        });
      });

      it('should allow to set props', function () {
        expect(example().setProps({welcomeText: 'Hello'}).getText())
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

      it('should allow to filter and get by custom predicate', () => {
        expect(
          example().setProps({welcomeText: 'hi'})
            .filterBy((node) => node === 'hi')
        ).toEqual(['hi']);
        expect(
          example().setProps({welcomeText: 'hey'})
            .getBy((node) => node === 'hey')
        ).toEqual('hey');
      });

      it('should re-render', () => {
        const drv = example().setProps({welcomeText: '123'});
        expect(drv.getText()).toEqual(['123']);
        drv.getByID('button').props.onPress();
        expect(drv.getText()).toEqual([]);
      });

      it('should unmount', () => {
        const onUnmount = jest.fn();
        example().setProps({onUnmount}).unmount();
        expect(onUnmount).toBeCalled();
      });
    });
  });
});
