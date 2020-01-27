export interface Backend<Renderer, Options> {
  render<P>(element: React.ReactElement<P>, options?: Options): Renderer;
  unmount(renderer: Renderer): void;
  toJSON(component: Renderer): Render;
}

export interface RenderedNode {
  type: string;
  props: { [propName: string]: any };
  children: null | Child[];
}

export type Child = RenderedNode | string;

export type Render = null | Child | Child[];


export function render_map(render: Render, f: (node: Child) => Child): Render {
  if (render) {
    if (Array.isArray(render)) {
      return render.map(child => tree_map(child, f))
    }
    return tree_map(render, f);
  }
  return render;
}

function tree_map(node: Child, f: (node: Child) => Child): Child {
  if (typeof node === 'string') {
    return f(node);
  }
  const children = node.children || [];
  return f({...node, children: children.map((node) => tree_map(node, f))});
}
