import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Form} from './form';
import {List} from './list';
import {stateReader} from './store/reader';

class _App extends PureComponent {
  static TEST_ID = {
    APP: 'app',
    FORM: 'app.form',
    LIST: 'app.list',
  };

  onAdd = (item) => {};

  render() {
    const {listItems, formInput, onAddItem, onInputChange} = this.props;
    return (
      <div data-test-id={App.TEST_ID.APP}>
        <Form
          input={formInput}
          onInputChange={onInputChange}
          onAdd={onAddItem}
          testID={App.TEST_ID.FORM}
        />
        <List items={listItems} testID={App.TEST_ID.LIST}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const sr = stateReader(state);
  return {
    listItems: sr.getListItems(),
    formInput: sr.getFormInput(),
  };
}

function mapDispatchToProps(dispatch, getState) {
  return {
    onAddItem: (input) => dispatch({type: 'onAddItem', item: input}),
    onInputChange: (input) => dispatch({type: 'onInputChange', input}),
  };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
