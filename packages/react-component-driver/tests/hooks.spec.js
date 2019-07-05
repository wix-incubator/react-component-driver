import React, { useState } from 'react';
import * as shallow from '../shallow';
import * as full from '../index';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p data-test-id="count">You clicked {count} times</p>
      <button data-test-id="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

describe('hooks', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  [['shallow', shallow], ['full', full]].forEach(([name, renderer]) => {
    describe(name + ' render', () => {
      const counter = () => renderer.componentDriver(Example, {
        getCountText() {
          return full.getTextNodes(this.getByID('count')).join('');
        },
        clickButton() {
          this.getByID('button').props.onClick();
          return this;
        },
      });

      it('should update state and do not complain about it', () => {
        const drv = counter();
        expect(drv.getCountText()).toEqual('You clicked 0 times');
        drv.clickButton();
        expect(drv.getCountText()).toEqual('You clicked 1 times');
        expect(console.error).not.toBeCalled();
      });
    });
  });
});
