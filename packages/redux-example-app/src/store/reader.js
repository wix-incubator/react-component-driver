import {listReader} from './list';
import {formReader} from './form';

export function stateReader(state) {
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

