import {reduxDriver, ReduxComponentDriver} from 'redux-component-driver';

import {formDriver} from './components/form.driver';
import {listDriver} from './components/list.driver';
import {createAppStore, State} from './store';
import {App, Props, TEST_ID} from './app';
import {FormAction} from './store/form';
import {ListAction} from './store/list';
import {ChangeEvent} from 'redux-component-driver/node_modules/@types/react';

function getTestID(prefix: string, suffix: string) {
  return prefix + '.' + suffix;
}

class AppDriver extends ReduxComponentDriver<Props, State, FormAction | ListAction> {
  constructor() {
    super(App, createAppStore());
  }

  getList() {
    const node = this.getByID(TEST_ID.LIST);
    if (node) {
      return listDriver().attachTo(node).getItems();
    }
    throw new Error(`Cannot find list by id ${TEST_ID.LIST}.`);
  }

  getForm() {
    const node = this.getByID(TEST_ID.FORM);
    if (node) {
      return formDriver().attachTo(node);
    }
    throw new Error(`Cannot find form by id ${TEST_ID.FORM}`);
  }

  inputText(value: string) {
    this.getForm().invokeOnInputChange({target: {value}} as ChangeEvent<HTMLInputElement>);
    return this;
  }

  clickAdd() {
    this.getForm().clickAdd();
    return this;
  }
}

function appDriver() {
  return new AppDriver();
}

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
