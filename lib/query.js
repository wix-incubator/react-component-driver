export default backend => {
  const { toJSON } = backend;

  function getTextNodes(tree) {
    return filterBy(node => typeof node === 'string' || typeof node === 'number', tree);
  }

  function filterByTestID(id, tree) {
    return filterBy(node => node.props && node.props.testID === id, tree);
  }

  function filterByType(type, tree) {
    return filterBy(node => node.type === type, tree);
  }

  function filterBy(p, tree) {
    return tree_fold(toJSON(tree), [], (acc, node) => p(node) ? acc.concat(node) : acc);
  }

  return {
    getTextNodes,
    filterByTestID,
    filterByType,
    filterBy
  };
};

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
