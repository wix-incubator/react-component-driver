import React, {PureComponent} from 'react';
import {containerDriver} from 'reteru';

import {formDriver} from './form.driver';
import {listDriver} from './list.driver';
import {createAppStore} from './store';
import {App} from './app';

function getTestID(prefix, suffix) {
  return prefix + '.' + suffix;
}

const appDriver = containerDriver(App, createAppStore, {
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
    this.getForm().invokeOnInputChange(value);
    return this;
  },
  clickAdd() {
    this.getForm().clickAdd();
    return this;
  },
});

describe('App', () => {
  it('has no items by default', () => {
    expect(appDriver().getList()).to.deep.equal([]);
  });

  it('can add an item', () => {
    const drv = appDriver();
    drv.inputText('hello, world').clickAdd();
    expect(drv.getList()).to.deep.equal([['1', 'hello, world']]);
  });
});
