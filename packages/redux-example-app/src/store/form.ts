export interface FormState {
  input: string;
}

const FORM_INITIAL_STATE: FormState = {
  input: ''
};

export type FormAction = { type: 'onInputChange', input: string }

export function formReducer(state = FORM_INITIAL_STATE, action: FormAction) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  }
  return state;
}

const reducers = {
  onInputChange(state: FormState, action: FormAction) {
    return {
      ...state,
      input: action.input,
    };
  }
};

export function formReader(state: FormState) {
  return {
    getInput() {
      return state.input;
    }
  };
}
