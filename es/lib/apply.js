import modal from './components/modal';
import redirect from './redirect';
import { api } from '../utils/platform';
var width = window.screen.availWidth;

var apply = function apply(key, type, platform) {
  if (type === void 0) {
    type = 'modal';
  }

  if (platform === void 0) {
    platform = 'production';
  }

  if (!key) {
    throw new Error('API public key required.');
  } // always use redirect for small devices


  if (width <= 479) return redirect(source);

  if (type.toLowerCase() === 'modal') {
    return modal(api(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(api(platform) + '/apply/start/' + key);
  }
};

export default apply;