// This is example of driver nesting when sub-component's are identified by
// concatenating parents testID with local suffixes. Look at form and list
// drivers to see how testID are generated (hint: getNestedID() method). This
// way both integration and component tests continue to work using same (full
// render) driver.

jest.mock('TouchableOpacity', () => 'TouchableOpacity');

import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {componentDriver, getTextNodes} from '../../lib/redux-full-render';
import {Form} from '../../components/nested/form';
import {formDriver} from '../../components/nested/form-driver';
import {List} from '../../components/nested/list';
import {listDriver} from '../../components/nested/list-driver';


function getTestID(prefix, suffix) {
  return prefix + '.' + suffix;
}

class App extends PureComponent {
  static TEST_ID = {
    APP: 'app',
    FORM: 'app.form',
    LIST: 'app.list',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  onAdd = (item) => this.setState({
    list: [...this.state.list, item]
  });

  render() {
    return (
      <View testID={App.TEST_ID.APP}>
        <Form onAdd={this.onAdd} testID={App.TEST_ID.FORM}/>
        <List items={this.state.list} testID={App.TEST_ID.LIST}/>
      </View>
    );
  }
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

describe('Nested Drivers', () => {
  it('should have no items by default', () => {
    const driver = appDriver();
    expect(driver.getList()).toEqual([]);
  });

  it('should add item', () => {
    const driver = appDriver();
    driver.inputText('hello, world').tapAdd();
    expect(driver.getList()).toEqual([['1', 'hello, world']]);
  });
});
