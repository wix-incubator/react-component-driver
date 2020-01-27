import React, {PureComponent} from 'react';
import {componentDriver} from 'react-component-driver';

import createApp from './app';
import {createAppState} from './store';
import {formDriver} from './components/form.driver';
import {listDriver} from './components/list.driver';

function getTestID(prefix, suffix) {
  return prefix + '.' + suffix;
}

const App = createApp(createAppState());

const appDriver = () => componentDriver(App, {
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
