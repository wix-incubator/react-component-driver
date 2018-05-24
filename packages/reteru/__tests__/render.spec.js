import ReduxExample from '../components/redux-example';
import Example from '../components/example';
import ExampleWithEmptyElements from '../components/example-with-empty-elements';
import NumberNodeExample from '../components/number-node-example';
import Null from '../components/null';
import Undefined from '../components/undefined';

import * as enzyme from '../lib/redux-shallow';
import * as reactTestRenderer from '../lib/redux-full-render';

function test(suiteName, {
  renderComponent,
  getTextNodes,
  getStore,
  renderContainer,
  filterByType,
  filterByTestID
}) {
  describe(suiteName, function () {
    it('should render component', function () {
      const welcomeText = 'Hello, World!';
      const example = renderComponent(Example, {welcomeText});
      expect(getTextNodes(example)).toEqual([welcomeText]);
    });

    it('should render container connected to redux store', function () {
      const welcomeText = 'Hello, World!';
      const example = renderContainer(ReduxExample, getStore(state => state, {welcomeText}));
      expect(getTextNodes(example)).toEqual([welcomeText]);
    });

    it('should re-render when state changes', function () {
      const welcomeText = 'Hello, World!';
      const example = renderComponent(Example, {welcomeText});
      filterByTestID('Button', example)[0].props.onPress();
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

test('Enzyme Rendering', enzyme);
test('ReactTestRenderer Rendering', reactTestRenderer);
