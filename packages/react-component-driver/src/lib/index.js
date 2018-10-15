import core from './core';
import {componentDriver} from './driver';

export default function recodr(backend) {
  const utils = core(backend);

  return {
    componentDriver: componentDriver(utils),
    ...utils,
  };
}
