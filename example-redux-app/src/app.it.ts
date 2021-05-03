import {ChangeEvent} from 'react';
import {ReduxComponentDriver} from 'redux-component-driver';

import {formDriver} from './components/form.driver';
import {listDriver} from './components/list.driver';
import {createAppStore, State} from './store';
import {App, TEST_ID} from './app';
import {FormAction} from './store/form';
import {ListAction} from './store/list';
import {Repository} from './repository';


class AppDriver extends ReduxComponentDriver<ReturnType<typeof App>, State, FormAction | ListAction> {
  constructor(private repository: Repository) {
    super(App(repository), createAppStore());
  }

  withListInRepository(items: string[]) {
    sinon.stub(this.repository, 'getList').resolves(items);
    return this;
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
  return new AppDriver(new Repository());
}

describe('App', () => {
  it('has no items by default', () => {
    expect(appDriver().getList()).to.deep.equal([]);
  });

  it('loads items from a repository', async () => {
    const drv = appDriver()
      .withListInRepository(['loaded', 'asynchronously'])
      .render();
    await tick();
    expect(drv.getList()).to.deep.equal([['1', 'loaded'], ['2', 'asynchronously']]);
  });

  it('can add an item', () => {
    const drv = appDriver();
    drv.inputText('hello, world').clickAdd();
    expect(drv.getList()).to.deep.equal([['1', 'hello, world']]);
  });
});

function tick() {
  return new Promise((resolve) => setTimeout(resolve));
}
