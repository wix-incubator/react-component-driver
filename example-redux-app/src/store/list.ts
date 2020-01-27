export interface ListState {
  items: string[];
}

const LIST_INITIAL_STATE: ListState = {
  items: []
};

export type ListAction = {type: 'onAddItem', item: string};

export function listReducer(state = LIST_INITIAL_STATE, action: ListAction) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  onAddItem(state: ListState, action: ListAction) {
    return {
      ...state,
      items: listReader(state).getItems().concat(action.item),
    };
  }
};

export function listReader(state: ListState) {
  return {
    getItems() {
      return state.items;
    }
  };
}
