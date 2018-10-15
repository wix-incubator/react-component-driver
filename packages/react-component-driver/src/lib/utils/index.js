import React from 'React';

export function component(comp, props = {}) {
  return React.createElement(comp, props);
}

