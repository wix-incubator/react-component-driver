import React, {PureComponent} from 'react';

import {componentDriver} from 'reut';
import {formDriver} from './form.driver';
import {listDriver} from './list.driver';

import {App} from './app';

function getTestID(prefix, suffix) {
  return prefix + '.' + suffix;
}

const appDriver = componentDriver(App, {
  getList() {
    return listDriver()
      .attachTo(this.getByID(App.TEST_ID.LIST))
      .getItems();
  },
  getForm() {
    return formDriver()
      .attachTo(this.getByID(App.TEST_ID.FORM));
  },
  inputText(value) {
    this.getForm().setInputValue(value);
    return this;
  },
  tapAdd() {
    this.getForm().tapAdd();
    return this;
  },
});

describe('App', () => {
  it('has no items by default', () => {
    expect(appDriver().getList()).to.deep.equal([]);
  });

  it('can add an item', () => {
    const drv = appDriver();
    drv.inputText('hello, world').tapAdd();
    expect(drv.getList()).to.deep.equal([['1', 'hello, world']]);
  });
});
