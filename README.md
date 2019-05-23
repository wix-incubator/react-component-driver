# React Component Driver

## Introduction

This is a collection of utilities to help test React components using [https://reactjs.org/docs/test-renderer.html][React Test Renderer]. It came into existence while developing React Native mobile app, thus it's grounded in practice.

## Why

User Interface testing is very much debatable. When it comes to testing looks, more often than not, it should be left for human testers. But logic, that is hiding in UI, can and should be automated. Even if all state gets extracted into [https://martinfowler.com/eaaDev/PresentationModel.html][Presenter object], the only integration point is UI layer. Many things, -- button clicks, existence of elements, counts of items, -- can be checked and underlying state, integration correctness implied.

## How

This library is built on top of data structure produced by [https://reactjs.org/docs/test-renderer.html][React Test Renderer]. This allows rendering React components into simple object trees. Using various helpers you can assert properties of those trees, invoke callbacks passed as properties, and observe tree updates. To get better idea, see examples in this repository, follow [Tutorial.md][tutorial].

## Related

### Unit Testing

### Integration Testing

### Snapshot Testing

### react-testing-library
