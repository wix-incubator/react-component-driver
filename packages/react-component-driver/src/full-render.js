import recodr from './lib/index';
import * as fullRenderBackend from './lib/backends/full-render';
import withContext from './lib/utils/context';

module.exports = {
  ...recodr(fullRenderBackend),
  withContext,
};
