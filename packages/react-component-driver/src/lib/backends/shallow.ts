import {createRenderer, ShallowRenderer as Renderer} from 'react-test-renderer/shallow';
import {Render} from './types';
import {flatten} from '../utils/flatten';

// `twice' is needed for redux case when shallow rendering connected component.
// First render returns <Connected/> and second unwraps it to get what you
// actually want.
export function render<P = {}>(element: React.ReactElement<P>, twice?: boolean): Renderer {
  const renderer = createRenderer()
  renderer.render(element);
  if (twice === true) {
    return render(renderer.getRenderOutput());
  }
  return renderer;
}

export function toJSON(component: Renderer): Render {
  return _toJSON(component.getRenderOutput()) || '';
}

function getComponentName(component: any) {
  return component.displayName || component.name;
}

function getTypeName(typeObject: any) {
  return typeObject.render ?
    getComponentName(typeObject.render) :
    getComponentName(typeObject);
}

export function _toJSON(node: any): any {
  if (Array.isArray(node)) {
    return node.map(_toJSON);
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  } else if (node == null || node === false) {
    return null;
  } else {
    const type = node.type;
    const typeName = typeof type === 'string' ? type : getTypeName(type);
    const props = {...node.props};
    delete props.children;
    const children = node.props.children;
    return {
      type: typeName,
      props,
      children: Array.isArray(children) ?
        flatten(children.map(_toJSON)).filter(notNull) :
        (children != null && [_toJSON(maybeToString(children))].filter(notNull) || [])
    };
  }
}

function notNull(x: any) {
  return x !== null;
}

function maybeToString(node: any) {
  if (typeof node === 'number') {
    return node.toString();
  } else if (node == null) {
    return null;
  }
  return node;
}
