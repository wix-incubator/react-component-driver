# API of Redux Component Driver

Re-exports everything from `react-component-driver` and adds following:

## Class `ReduxComponentDriver`

Extends `ComponentDriver` of `react-component-driver`, but passed component in constructor is wrapped with `withStore`.

```javascript
class App extends ReduxComponentDriver {
    constructor() {
        super(App, createStore(appReducer));
    }
}
```

## `reduxDriver(Component, store, methods)`

Same as `componentDriver` from `react-component-driver`, but wraps `Component` in `<Provider store={store}>`.

## `withStore(WrappedComponent, store)`

Wraps `WrappedComponent` with `<Provider store={store}>`.
