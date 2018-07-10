const FORM_INITIAL_STATE = {
  input: ''
};

export function formReducer(state = FORM_INITIAL_STATE, action) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  onInputChange(state, action) {
    return Object.assign({}, state, {
      input: action.input,
    });
  }
};

export function formReader(state) {
  return {
    getInput() {
      return state.input;
    }
  };
}
