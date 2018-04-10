import testRenderer from 'react-test-renderer';

export function render(reactElement, options) {
  return testRenderer.create(reactElement, options);
}

export function isRendered(component) {
  return !component || !component.toJSON;
}

export function toJSON(component) {
  if (!isRendered(component)) {
    component = component.toJSON();
  }
  return tree_map(component, maybeToString);
}

function maybeToString(node) {
  if (typeof node === 'number') {
    return node.toString();
  } else if (node === null) {
    return '';
  }
  return node;
}

function tree_map(node, f) {
  if (typeof node === 'object' && node) {
    const children = node.children || [];
    return f({
      ...node,
      children: children.map((node) => tree_map(node, f))
    });
  } else {
    return f(node);
  }
}
