import fullRender = require('./backends/full-render');
import {Backend, Render, Child, RenderedNode, render_map} from './backends/types';
import {flatten} from './utils/flatten';

export interface Queries {
  getTextNodes(tree: Render): string[];
  filterByTestID(id: string | RegExp, tree: Render): RenderedNode[];
  filterByType(type: string, tree: Render): RenderedNode[];
  filterBy(predicate: (node: Child) => boolean, tree: Render): Child[];
}

export default function queries<R, O>(backend: Backend<R, O>): Queries {
  const { toJSON } = backend;

  function getTestID(node: Child): string | undefined {
    const props = node && typeof node === 'object' ? node.props : {};
    return props.testID || props['data-test-id'];
  }

  function getTextNodes(tree: Render) {
    return filterBy(node => typeof node === 'string' || typeof node === 'number', tree);
  }

  function filterByTestID(id: string | RegExp, tree: Render): RenderedNode[] {
    const predicate =
      id.constructor === RegExp ?
      ((node: Child) => {
        const testID = getTestID(node);
        if (testID) {
          return (id as RegExp).test(testID);
        }
        return false;
      }) :
      ((node: Child) => getTestID(node) === id);
    return (filterBy(predicate, tree) as unknown[]) as RenderedNode[];
  }

  function filterByType(type: string, tree: Render): RenderedNode[] {
    return (filterBy(node => typeof node === 'object' && node.type === type, tree) as unknown[]) as RenderedNode[];
  }

  function filterBy(predicate: (node: Child) => boolean, tree: Render) {
    const f = (acc: Child[], node: Child) => predicate(node) ? acc.concat(node) : acc;
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

function get_children(node: Child) {
  if (node && typeof node === 'object') {
    return node.children || [];
  }
  return [];
}

function tree_fold<R>(node: Child, acc: R, f: (acc: R, node: Child) => R): R {
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
