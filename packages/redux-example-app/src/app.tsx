import * as React from 'react';
import {connect, MapDispatchToPropsFunction} from 'react-redux';

import {Form} from './components/form';
import {List} from './components/list';
import {stateReader} from './store/reader';
import {State} from './store';
import {FormAction} from './store/form';
import {ListAction} from './store/list';
import {Dispatch} from 'redux-component-driver/node_modules/redux';

type Actions = FormAction | ListAction;

export interface Props {
  listItems: string[];
  formInput: string;
  onAddItem(item: string): void;
  onInputChange(input: string): void;
}

export const TEST_ID = {
  APP: 'app',
  FORM: 'app.form',
  LIST: 'app.list',
};

class _App extends React.PureComponent<Props> {
  render() {
    const {listItems, formInput, onAddItem, onInputChange} = this.props;
    return (
      <div data-test-id={TEST_ID.APP}>
        <Form
          input={formInput}
          onInputChange={onInputChange}
          onAdd={onAddItem}
          data-test-id={TEST_ID.FORM}
        />
        <List items={listItems} data-test-id={TEST_ID.LIST}/>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  const sr = stateReader(state);
  return {
    listItems: sr.getListItems(),
    formInput: sr.getFormInput(),
  };
}

interface DispatchProps {
  onAddItem(input: string): Actions;
  onInputChange(input: string): Actions;
}

function mapDispatchToProps(dispatch: Dispatch<Actions>, props: Props): DispatchProps {
  return {
    onAddItem: (input: string) => dispatch({type: 'onAddItem', item: input}),
    onInputChange: (input: string) => dispatch({type: 'onInputChange', input}),
  };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
