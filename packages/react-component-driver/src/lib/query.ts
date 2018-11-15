import fullRender = require('./backends/full-render');
import {Backend, Render, RChild, RNode, render_map} from './backends/types';
import {flatten} from './utils/flatten';

export interface Queries {
  getTextNodes(tree: Render): RChild[];
  filterByTestID(id: string | RegExp, tree: Render): RNode[];
  filterByType(type: string, tree: Render): RNode[];
  filterBy(predicate: (node: RChild) => boolean, tree: Render): RChild[];
}

export default function queries<R, O>(backend: Backend<R, O>): Queries {
  const { toJSON } = backend;

  function getTestID(node: RChild): string | undefined {
    const props = node && typeof node === 'object' ? node.props : {};
    return props.testID || props['data-test-id'];
  }

  function getTextNodes(tree: Render) {
    return filterBy(node => typeof node === 'string' || typeof node === 'number', tree);
  }

  function filterByTestID(id: string | RegExp, tree: Render): RNode[] {
    const predicate =
      id.constructor === RegExp ?
      ((node: RChild) => {
        const testID = getTestID(node);
        if (testID) {
          return (id as RegExp).test(testID);
        }
        return false;
      }) :
      ((node: RChild) => getTestID(node) === id);
    return (filterBy(predicate, tree) as unknown[]) as RNode[];
  }

  function filterByType(type: string, tree: Render): RNode[] {
    return (filterBy(node => typeof node === 'object' && node.type === type, tree) as unknown[]) as RNode[];
  }

  function filterBy(predicate: (node: RChild) => boolean, tree: Render) {
    const f = (acc: RChild[], node: RChild) => predicate(node) ? acc.concat(node) : acc;
    if (Array.isArray(tree)) {
      return flatten(tree.map((node) => tree_fold(node, [], f)));
    } else if (tree) {
      return tree_fold(tree, [], f);
    }
    return [];
  }

  return {
    getTextNodes,
    filterByTestID,
    filterByType,
    filterBy
  };
};

function get_children(node: RChild) {
  if (node && typeof node === 'object') {
    return node.children || [];
  }
  return [];
}

function tree_fold<R>(node: RChild, acc: R, f: (acc: R, node: RChild) => R): R {
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
