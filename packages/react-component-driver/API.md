# API of React Component Driver

## Class `ComponentDriver<Props>`

```javascript
class ButtonDriver extends ComponentDriver {
  constructor() {
    super(Button);
  }

  click() {
    this.getComponent().props.onClick();
    return this;
  }

  isDisabled() {
    return !!this.getComponent().props.disabled;
  }
}

expect(new ButtonDriver().click().isDisabled()).toBe(true);
```

`setProps(props: Partial<Props>): this`

```javascript
new ButtonDriver().setProps({label: 'Add Item'});
```

`render(): this`

Renders component and discards output. This starts component's life cycle. Querying methods do this automatically.

`getComponent(): Render`

Renders and returns whole component and JSON.

`filterBy(predicate: (node: Child) => boolean): Child[]`

Returns elements for which `predicate` returns `true`.

`filterByID(id: string | RegExp): RenderedNode[]`

Returns elements with matching `testID` or `data-test-id` properties.

`filterByType(type: string): RenderedNode[]`

Returns elements with component type equal to `type`.

`getBy(predicate: (node: Child) => boolean): Child | undefined`
`getByID(id: string | RegExp): RenderedNode | undefined`
`getByType(type: string): RenderedNode | undefined`

Same as `filterBy*` counterparts, but returns only first element if found.

`attachTo(node: Render): this`

Instead of rendering new tree, use `node` as pre-rendered value.

`unmount(): void`

Invoke unmount cycle.


## Utilities

Utilities on which `ComponentDriver` class is based on.

`render<P>(element: React.ReactElement<P>): Renderer`

Prepare React element for rendering.

`renderComponent<P>(comp: React.ComponentType<P>, props: P): Renderer`

Given component construct React element, pass `props`, and call `render` with it.

`toJSON(renderer: Renderer): Render`

Render component to JSON notation.

`unmount(renderer: Renderer): void`

Invoke unmount cycle.

`filterBy(predicate: (node: Child) => boolean, tree: Render | Renderer): Child[]`

Returns elements for which `predicate` returns `true`.

`filterByTestID(id: string | RegExp, tree: Render | Renderer): RenderedNode[]`

Returns elements with matching `testID` or `data-test-id` properties.

`filterByType(type: string, tree: Render | Renderer): RenderedNode[]`

Returns elements with component type equal to `type`.

`getTextNodes(tree: Render | Renderer): string[]`

Returns all strings of tree or sub-tree.
