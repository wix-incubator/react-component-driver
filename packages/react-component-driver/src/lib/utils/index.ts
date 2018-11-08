import * as React from 'react';

type EmptyObjectOr<P> = P | {};

export function component<P = {}, S = {}>(
  Comp: React.ComponentClass<EmptyObjectOr<P>, S>,
  props: EmptyObjectOr<P> = {},
) {
  return React.createElement(Comp, props);
}
