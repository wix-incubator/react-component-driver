import * as React from 'react';
import {createStore} from 'redux';
import {expect} from 'chai';

import {withStore} from './redux';

class Example extends React.PureComponent {
  static f() {
  }

  render() {
    return null;
  }
}

describe('withStore()', () => {
  it('should preserve static properties', () => {
    const ConnectedExample = withStore(Example, createStore((a) => a));
    expect(ConnectedExample.f).to.equal(Example.f);
  });
});
