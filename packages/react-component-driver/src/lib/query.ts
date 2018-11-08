import fullRender = require('./backends/full-render');
import {InitialRender, Node} from './backends/types';

export default (backend: typeof fullRender) => {
  const { toJSON } = backend;

  function getTestID(node: Node) {
    const props = node && typeof node === 'object' ? node.props : {};
    return props.testID || props['data-test-id'];
  }

  function getTextNodes(tree: Node) {
    return filterBy(node => typeof node === 'string' || typeof node === 'number', tree);
  }

  function filterByTestID(id, tree) {
    const predicate =
      id.constructor === RegExp ?
      (node) => id.test(getTestID(node)) :
      (node) => getTestID(node) === id;
    return filterBy(predicate, tree);
  }

  function filterByType(type, tree) {
    return filterBy(node => node.type === type, tree);
  }

  function filterBy(predicate: (node: Node) => boolean, tree: InitialRender) {
    const json = toJSON(tree);
    const f = (acc: Node[], node: Node) => predicate(node) ? acc.concat(node) : acc;
    if (Array.isArray(json)) {
      return flatten(json.map((node) => tree_fold(node, [], f)));
    } else if (isIterable(json)) {
      // Some weird full renderer case.
      return flatten(
        Object.keys(json)
          .filter((key) => Number.isInteger(+key))
          .map((i) => tree_fold(json[i], [], f))
      );
    } else {
      return tree_fold(json, [], f);
    }
  }

  return {
    getTextNodes,
    filterByTestID,
    filterByType,
    filterBy
  };
};

function flatten<X>(arrays: X[][]): X[] {
  return Array.prototype.concat.call([] as X[], ...arrays);
}

// XXX: full renderer returns array like object if array is used for root
// element. Children is supposed to always be empty.
function isIterable(json: any): boolean {
  return json && json[0] && json.children && json.children.length === 0;
}

function get_children(node: Node) {
  if (node && typeof node === 'object') {
    return node.children || [];
  }
  return [];
}

function tree_fold<R>(node: Node, acc: R, f: (acc: R, node: Node) => R): R {
  return list_fold(
    get_children(node),
    f(acc, node),
    (acc, node) => tree_fold(node, acc, f));
}

function list_fold<X, R>(list: X[], acc: R, f: (acc: R, x: X) => R): R {
  for (let i = 0; i < list.length; i++) {
    acc = f(acc, list[i]);
  }
  return acc;
}
