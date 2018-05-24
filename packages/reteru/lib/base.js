import { component } from './utils';
import queryFactory from './query';

export default backend => {
  const { render, toJSON } = backend;

  function renderComponent(comp, props, ...rest) {
    return render(component(comp, props), ...rest);
  }

  return {
    render,
    renderComponent,
    ...queryFactory(backend),
  };
};
