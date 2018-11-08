import React from 'react';
import RTR from 'react-test-renderer';
import Shallow from 'react-test-renderer/shallow';
import fc from 'fast-check';

import * as shallow from '../dist/lib/backends/shallow';
import * as full from '../dist/lib/backends/full-render';

describe('Sanity', () => {
  describe('React Test Renderer', () => {
    it('does what we expect', () => {
      function Y() {
        return ['', 1, <a key={1}/>, undefined, 3, null];
      }

      function X() {
        return <div>{[<Y key={1}/>, <a key={2}/>]}</div>;
      }

      expect(RTR.create(<X/>).toJSON()).toEqual({
        type: 'div', props: {}, children: [
          '',
          '1',
          {type: 'a', props: {}, children: null},
          '3',
          {type: 'a', props: {}, children: null},
        ]
      });
    });
  });

  describe('Shallow Renderer', () => {
    it('should follow full renderer structure', () => {
      fc.assert(fc.property(
        arbitraryReactElement(),
        (x) => equal(full.toJSON(RTR.create(x)), shallow._toJSON(x))
      ), {numRuns: 1000});
    });
  });
});

function arbitraryBaseValue() {
  return fc.oneof(
    fc.constant(null),
    fc.constant(''),
    fc.constant(0),
    fc.constant(1),
    fc.integer(),
    fc.float(),
    fc.string(),
  );
}

function arbitraryReactElement(maxdepth = 3) {
  const tags = ['div', 'span', 'a'].map(fc.constant);
  return fc.tuple(
    fc.oneof(...tags),
    fc.oneof(fc.constant(null), fc.array(arbitraryElement(maxdepth - 1), 3))
  )
    .map(([tag, children]) => React.createElement(tag, {key: Math.random()}, children));
}

function arbitraryElement(maxdepth) {
  if (maxdepth > 0) {
    return fc.oneof(
      fc.array(arbitraryBaseValue(maxdepth - 1), 3),
      arbitraryBaseValue(),
      arbitraryReactElement(maxdepth - 1),
    );
  }
  return arbitraryBaseValue();
}

function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
