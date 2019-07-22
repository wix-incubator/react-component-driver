# React Component Driver

## Introduction

This is a collection of utilities to help test React components. It's based on [React Test Renderer](https://reactjs.org/docs/test-renderer.html) and came into existence while developing production React Native application.

## Why

Even though all state of components can be be extracted into [Presenter object](https://martinfowler.com/eaaDev/PresentationModel.html), it still must be integrated at UI layer. [React Test Renderer](https://reactjs.org/docs/test-renderer.html) can help you check integration correctness and **React Component Driver** will allow to make your tests readable and maintainable.

## How

This library is built on top of simple data structure derived from one produced by [React Test Renderer](https://reactjs.org/docs/test-renderer.html). This allows rendering React components into simple object trees. Using various helpers you can assert properties of those trees, invoke callbacks passed as properties, and observe tree changes. To get better idea, see examples in this repository, and follow [the tutorial](Tutorial.md).

## API

For up to date, working examples see example projects in `packages` directory.

### react-component-driver

- [Not so Quick Guide](packages/react-component-driver/README.org).
- [API](packages/react-component-driver/API.md).

### redux-component-driver

- [API](packages/redux-component-driver/API.md).

## Related

### Unit Testing

In testing pyramid Unit Tests are the largest group. They are meant to test and specify smallest units of program for whatever "unit" might stand for. Most of the time Units correspond to Classes, Objects, or functions / methods. Since React components can be implemented as functions or classes they may be unit tested. In practice this is not very useful because there are a lot more ways to call component class methods than what React component's life-cycle actually permits.

### Integration Testing

Integration (or Integrating) Tests combine multiple Units and test or specify their behaviour as a group. Tests based on **React Component Driver** are Integration Tests because they integrate not only components being rendered but also React's life-cycle.

### Snapshot Testing

TBD

### react-testing-library

TBD
