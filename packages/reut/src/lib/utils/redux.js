import React from 'react';
import {Provider} from 'react-redux';

export function withStore(comp, store, props = {}) {
  return <Provider store={store}>{React.createElement(comp, props)}</Provider>;
}
