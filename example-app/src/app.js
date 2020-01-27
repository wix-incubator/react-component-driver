import React, {PureComponent, Component, useState, useEffect} from 'react';

import {Form} from './components/form';
import {List} from './components/list';

App.TEST_ID = {
  APP: 'app',
  FORM: 'app.form',
  LIST: 'app.list',
};

export function App() {
  const [list, setList] = useState([]);

  return (
    <div data-test-id={App.TEST_ID.APP}>
      <Form onAdd={(item) => setList(list.concat(item))} testID={App.TEST_ID.FORM}/>
      <List items={list} testID={App.TEST_ID.LIST}/>
    </div>
  );
}
