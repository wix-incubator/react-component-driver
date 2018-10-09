import React from 'react';
import { Text, View } from 'react-native';

import * as enzyme from '../lib/shallow';
import * as rtr from '../lib/full-render';

[
  ['shallow', enzyme],
  ['full renderer', rtr]
].forEach(([name, backend]) => {
  describe(name + ' queries', function () {
    const {
      renderComponent,
      getTextNodes,
      filterByTestID,
      filterByType,
      filterBy,
    } = backend;

    it('should extract text nodes', function () {
      const comp = renderComponent(() => (
        <View>
          <Text>Hello</Text>
          <Text>World</Text>
        </View>
      ));
      expect(getTextNodes(comp)).toEqual(['Hello', 'World']);
    });

    it('should extract number 0', function () {
      const comp = renderComponent(() => (
        <View>
          <Text>{0}</Text>
          <Text>{1}</Text>
        </View>
      ));
      expect(getTextNodes(comp)).toEqual(['0', '1']);
    });

    it('should extract text nodes by flattening nested array of children', function () {
      const texts = () => ['Hello', 'World'].map((txt, i) => <Text key={i}>{txt}</Text>);
      const comp = renderComponent(() => (<View>{texts()}{'!'}</View>));
      expect(getTextNodes(comp)).toEqual(['Hello', 'World', '!']);
    });

    it('should extract node by `testID` prop', function () {
      const node = <View testID='a'></View>;
      const comp = renderComponent(() => (<View>{node}</View>));
      expect(filterByTestID('a', comp)[0].type).toBe('View');
    });

    it('should extract node by `data-test-id` prop', function () {
      const node = <div data-test-id='a'></div>;
      const comp = renderComponent(() => (<div>{node}</div>));
      expect(filterByTestID('a', comp)[0].type).toBe('div');
    });

    it('should extract nodes by type', function () {
      const comp = renderComponent(() => <View><Text/><Text/><Text/></View>);
      expect(filterByType('Text', comp).length).toBe(3);
    });

    it('should allow to compose queries', function () {
      const comp = renderComponent(() => (
        <View>
          <View testID="a">
            <View testID="b"></View>
          </View>
        </View>
      ));
      expect(filterByTestID('b', filterByTestID('a', comp)[0])).toEqual([{
        children: [],
        props: {
          testID: 'b'
        },
        type: 'View'
      }]);
    });

    describe('array as root element', () => {
      let comp;

      beforeEach(function () {
        comp = renderComponent(() => [
          <View key={0} testID="v-1"/>,
          <View key={1} testID="v-2"/>,
          <View key={2} testID="v-3"/>,
        ]);
      });

      it('should still work with filtering', function () {
        const nodes = filterBy((node) => node && node.props && node.props.testID, comp);
        expect(nodes.length).toEqual(3);
      });

      it('should flatten then resulting array', function () {
        const types = filterByType('View', comp).map(node => node.type);
        expect(types).toEqual(['View', 'View', 'View']);
      });
    });
  });
});
