import * as React from 'react';
import {Dispatch} from 'redux';
import {connect, MapDispatchToPropsFunction} from 'react-redux';

import {Form} from './components/form';
import {List} from './components/list';
import {stateReader} from './store/reader';
import {State} from './store';
import {FormAction} from './store/form';
import {ListAction} from './store/list';
import {Repository} from './repository';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

type Actions = FormAction | ListAction;

interface DispatchProps {
  loadItems(): void;
  onAddItem(input: string): void;
  onInputChange(input: string): void;
}

export interface Props extends DispatchProps {
  listItems: string[];
  formInput: string;
}

export const TEST_ID = {
  APP: 'app',
  FORM: 'app.form',
  LIST: 'app.list',
};

const _App = (repository: Repository) => class extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.loadItems();
  }

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

export const App = (repository: Repository) => {
  function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, props: Props) {
    return {
      loadItems() {
        dispatch(async (dispatch, getState) => {
          const items = await repository.getList();
          items.map((item) => dispatch({type: 'onAddItem', item}));
          setTimeout(() => dispatch({type: 'onAddItem', item: 'B'}), 1000);
        });
      },
      onAddItem: (input: string) => dispatch({type: 'onAddItem', item: input}),
      onInputChange: (input: string) => dispatch({type: 'onInputChange', input}),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(_App(repository));
}
