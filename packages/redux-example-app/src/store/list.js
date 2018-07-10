const LIST_INITIAL_STATE = {
  items: []
};

export function listReducer(state = LIST_INITIAL_STATE, action) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  onAddItem(state, action) {
    return Object.assign({}, state, {
      items: listReader(state).getItems().concat(action.item),
    });
  }
};

export function listReader(state) {
  return {
    getItems() {
      return state.items;
    }
  };
}
