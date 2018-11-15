export interface Backend<Renderer, Options> {
  render<P>(element: React.ReactElement<P>, options?: Options): Renderer;
  toJSON(component: Renderer): Render;
}

export interface RNode {
  type: string;
  props: { [propName: string]: any };
  children: null | RChild[];
}

export type RChild = RNode | string;

export type Render = null | RChild | RChild[];


export function render_map(render: Render, f: (node: RChild) => RChild): Render {
  if (render) {
    if (Array.isArray(render)) {
      return render.map(child => tree_map(child, f))
    }
    return tree_map(render, f);
  }
  if (render === null) {
    return '';
  }
  return render;
}

function tree_map(node: RChild, f: (node: RChild) => RChild): RChild {
  if (typeof node === 'string') {
    return f(node);
  }
  const children = node.children || [];
  return f({...node, children: children.map((node) => tree_map(node, f))});
}
