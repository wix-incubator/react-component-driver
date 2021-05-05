import * as remx from 'remx';

export function createAppState() {
  const state = remx.state({
    input: '',
    items: [] as string[]
  });

  const getters = remx.getters({
    getInput() {
      return state.input;
    },
    getItems() {
      return state.items;
    },
  });

  const setters = remx.setters({
    setInput(value: string) {
      state.input = value;
    },
    addItem(value: string) {
      state.items = state.items.concat(value);
    }
  });

  return {
    getters,
    setters,
  };
}
