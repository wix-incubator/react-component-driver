export default backend => {
  const { toJSON } = backend;

  function getTestID(node) {
    const props = node && node.props || {};
    return props.testID || props['data-test-id'];
  }

  function getTextNodes(tree) {
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

  function filterBy(predicate, tree) {
    const json = toJSON(tree);
    const f = (acc, node) => predicate(node) ? acc.concat(node) : acc;
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

function flatten(arrays) {
  return [].concat(...arrays);
}

// XXX: full renderer returns array like object if array is used for root
// element. Children is supposed to always be empty.
function isIterable(json) {
  return json && json[0] && json.children && json.children.length === 0;
}

function tree_fold(node, acc, f) {
  return list_fold(
    node.children || [],
    f(acc, node),
    (acc, node) => tree_fold(node, acc, f));
}

function list_fold(list, acc, f) {
  for (let i = 0; i < list.length; i++) {
    acc = f(acc, list[i]);
  }
  return acc;
}
