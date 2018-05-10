jest.useFakeTimers();

import * as enzyme from '../lib/redux-shallow';
import * as reactTestRenderer from '../lib/redux-full-render';

function test(suiteName, {flushPromises}) {
  describe(suiteName, function () {
    it('should allow to flush promises', async function () {
      let value = 0;
      new Promise(resolve => setTimeout(resolve))
        .then(() => value = 1);
      await flushPromises();
      expect(value).toBe(1);
    });
  });
}

test('Enzyme Backend', enzyme);
test('ReactTestRenderer Backend', reactTestRenderer);
