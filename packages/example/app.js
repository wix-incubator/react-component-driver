import React, {PureComponent} from 'react';

import {Form} from './form';
import {List} from './list';

export class App extends PureComponent {
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
      <div data-test-id={App.TEST_ID.APP}>
        <Form onAdd={this.onAdd} testID={App.TEST_ID.FORM}/>
        <List items={this.state.list} testID={App.TEST_ID.LIST}/>
      </div>
    );
  }
}
