import ShallowRenderer from 'react-test-renderer/shallow';

// `twice' is needed for redux case when shallow rendering connected component.
// First render returns <Connected/> and second unwraps it to get what you
// actually want.
export function render(element, twice) {
  const renderer = new ShallowRenderer();
  renderer.render(element);
  if (twice) {
    return render(renderer.getRenderOutput());
  }
  return renderer;
}

export function toJSON(component) {
  if (isRendered(component)) {
    return maybeToString(component);
  }
  return _toJSON(component.getRenderOutput()) || '';
}

function _toJSON(node) {
  if (Array.isArray(node)) {
    return node.map(_toJSON);
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  } else if (node == null || node === false) {
    return null;
  } else {
    const type = node.type.displayName || node.type.name;
    const props = Object.assign({}, node.props);
    delete props.children;
    const children = node.props.children;
    return {
      type,
      props,
      children: Array.isArray(children) ?
        flatten(children.map(_toJSON)).filter(notNull) :
        (children != null && [_toJSON(maybeToString(children))].filter(notNull) || [])
    };
  }
}

function notNull(x) {
  return x !== null;
}

function isRendered(component) {
  return !component || !component.getRenderOutput;
}

function maybeToString(node) {
  if (typeof node === 'number') {
    return node.toString();
  } else if (node == null) {
    return null;
  }
  return node;
}

function flatten(elements) {
  const result = [];
  elements.forEach((element) => {
    if (Array.isArray(element)) {
      Array.prototype.push.apply(result, element);
    } else {
      result.push(element);
    }
  });
  return result;
}
