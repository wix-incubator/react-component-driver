import core, {Core} from './core';
import {Drivers, DriveableComponent, BaseComponentDriver, componentDriver} from './driver';
import {Backend} from './backends/types';

export default function recodr<Props, Renderer, Options>(backend: Backend<Renderer, Options>): Core<Renderer, Options> & Drivers<Props> {
  const utils = core(backend);

  class ComponentDriver<Props> extends BaseComponentDriver<Props, Renderer, Options> implements DriveableComponent<Props> {
    constructor(component: React.ComponentType<Props>) {
      super(utils, component);
    }
  }

  return {
    ComponentDriver,
    componentDriver: componentDriver(utils),
    ...utils,
  };
}
