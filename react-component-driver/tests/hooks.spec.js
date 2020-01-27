import React, { useState, useEffect } from 'react';
import {act} from 'react-test-renderer';
import * as shallowRenderer from 'react-test-renderer/shallow';

import * as shallow from '../shallow';
import * as full from '../index';

function CommonExample() {
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

function EffectsExample() {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnswer(42));
  }, []);

  return (
    <div>
      <p data-test-id="answer">{answer ? `Answer: ${answer}` : 'Loading ...'}</p>
    </div>
  );
}

describe('hooks', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  [['shallow', shallow], ['full', full]].forEach(([name, renderer]) => {
    describe(name + ' render', () => {
      const counter = () => renderer.componentDriver(CommonExample, {
        getCountText() {
          return full.getTextNodes(this.getByID('count')).join('');
        },
        clickButton() {
          this.getByID('button').props.onClick();
          return this;
        },
      });

      it('should update state and do not complain about it', () => {
        let drv = counter().render();
        expect(drv.getCountText()).toEqual('You clicked 0 times');
        drv.clickButton();
        expect(drv.getCountText()).toEqual('You clicked 1 times');
        expect(console.error).not.toBeCalled();
      });
    });
  });

  describe('with effects', () => {
    const example = () => full.componentDriver(EffectsExample, {
      getAnswer() {
        return full.getTextNodes(this.getByID('answer')).join('');
      }
    });

    it('should work and not complain', async () => {
      const drv = await example().renderAsync();
      await tick();
      expect(drv.getAnswer()).toEqual('Answer: 42');
      expect(console.error).not.toBeCalled();
    });
  });
});

function tick() {
  return new Promise((resolve) => setTimeout(resolve));
}
