import * as React from 'react';
import * as remx from 'remx';

import {Form} from './components/form';
import {List} from './components/list';
import {createAppState} from './store';

interface AppProps {
  listItems: string[];
  formInput: string;
}

export default ({getters, setters}: ReturnType<typeof createAppState>) => {
  class App extends React.Component<AppProps> {
    static TEST_ID = {
      APP: 'app',
      FORM: 'app.form',
      LIST: 'app.list',
    };

    render() {
      const {listItems, formInput} = this.props;
      return (
        <div data-test-id={App.TEST_ID.APP}>
          <Form
            input={formInput}
            onInputChange={setters.setInput}
            onAdd={setters.addItem}
            testID={App.TEST_ID.FORM}
          />
          <List items={listItems} testID={App.TEST_ID.LIST}/>
        </div>
      );
    }
  }

  function mapStateToProps() {
    return {
      listItems: getters.getItems(),
      formInput: getters.getInput(),
    };
  }

  return remx.connect(mapStateToProps)(App);
}
