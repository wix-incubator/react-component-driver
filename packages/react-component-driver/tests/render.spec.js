jest.mock('Text', () => 'Text');
jest.mock('View', () => 'View');

import Example from './components/example';
import ExampleWithEmptyElements from './components/example-with-empty-elements';
import NumberNodeExample from './components/number-node-example';
import Null from './components/null';
import Undefined from './components/undefined';

import * as shallow from '../shallow';
import * as full from '../index';

function test(suiteName, {
  renderComponent,
  getTextNodes,
  filterBy,
  filterByType,
  filterByTestID
}) {
  describe(suiteName, function () {
    it('should render component', function () {
      const welcomeText = 'Hello, World!';
      const example = renderComponent(Example, {welcomeText});
      expect(filterBy(() => true, example)[0]).toEqual({
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

    it('should re-render when state changes', function () {
      const welcomeText = 'Hello, World!';
      const example = renderComponent(Example, {welcomeText});
      filterByTestID('button', example)[0].props.onPress();
      expect(getTextNodes(example)).toEqual([]);
    });

    it('should know how to deal with number nodes', function () {
      const example = renderComponent(NumberNodeExample);
      expect(getTextNodes(example)).toEqual(['1']);
    });

    it('should know how to deal with number nodes', function () {
      const example = renderComponent(NumberNodeExample);
      expect(getTextNodes(example)).toEqual(['1']);
    });

    it('should know how to deal with null', function () {
      const example = renderComponent(Null);
      filterByType('Text', example);
    });

    it('should know how to deal with undefined', function () {
      const example = renderComponent(Undefined);
      filterByType('Text', example);
    });

    it('should skip false, null, undefined', function () {
      const example = renderComponent(ExampleWithEmptyElements);
      expect(getTextNodes(example)).toEqual(['Hello']);
    });
  });
}

test('Shallow rendering', shallow);
test('Full rendering', full);
