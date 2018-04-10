import React from 'react';
import { Text, View } from 'react-native';

import * as enzyme from '../lib/shallow';
import * as rtr from '../lib/full-render';

[
  ['enzyme', enzyme],
  ['react-test-renderer', rtr]
].forEach(([name, backend]) => {
  describe(name + ' queries', function () {
    const {
      renderComponent,
      getTextNodes,
      filterByTestID,
      filterByType,
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

    it('should extract text nodes by flattening nested array of children', function () {
      const texts = () => ['Hello', 'World'].map((txt, i) => <Text key={i}>{txt}</Text>);
      const comp = renderComponent(() => (<View>{texts()}{'!'}</View>));
      expect(getTextNodes(comp)).toEqual(['Hello', 'World', '!']);
    });

    it('should extract node by test ID', function () {
      const node = <View testID='a'></View>;
      const comp = renderComponent(() => (<View>{node}</View>));
      expect(filterByTestID('a', comp)[0].type).toBe('View');
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
  });
});
