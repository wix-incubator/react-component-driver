import core, {Core} from './core';
import {DriversI, ComponentDriverI, BaseComponentDriver, componentDriver} from './driver';
import {Backend} from './backends/types';

export default function recodr<Props, Renderer, Options>(backend: Backend<Renderer, Options>): Core<Renderer, Options> & DriversI<Props> {
  const utils = core(backend);

  class ComponentDriver<Props> extends BaseComponentDriver<Props, Renderer, Options> implements ComponentDriverI<Props> {
    constructor(component: React.ComponentClass<Props>) {
      super(utils, component);
    }
  }

  return {
    ComponentDriver,
    componentDriver: componentDriver(utils),
    ...utils,
  };
}
