import recodr from './lib/index';
import * as fullRenderBackend from './lib/backends/full-render';
import withContext from './lib/utils/context';

export default {
  ...recodr(fullRenderBackend),
  withContext,
};
