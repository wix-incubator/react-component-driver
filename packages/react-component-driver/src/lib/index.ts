import core from './core';
import {componentDriver} from './driver';
import {Backend} from './backends/types';

export default function recodr<R, O>(backend: Backend<R, O>) {
  const utils = core(backend);

  return {
    componentDriver: componentDriver(utils),
    ...utils,
  };
}
