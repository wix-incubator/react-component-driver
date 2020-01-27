import {listReader} from './list';
import {formReader} from './form';
import {State} from './index';

export function stateReader(state: State) {
  const lr = listReader(state.list);
  const fr = formReader(state.form);

  return {
    getListItems() {
      return lr.getItems();
    },
    getFormInput() {
      return fr.getInput();;
    },
  };
}

