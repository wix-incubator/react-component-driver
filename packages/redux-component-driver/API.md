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

## `withStore(WrappedComponent, store)`

Wraps `WrappedComponent` in Redux Provider and passes `store`.
