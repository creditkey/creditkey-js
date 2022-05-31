import modal from './components/modal';
import redirect from './redirect';
import { api } from '../utils/platform';

var apply = function apply(key, type, platform) {
  if (type === void 0) {
    type = 'modal';
  }

  if (platform === void 0) {
    platform = 'production';
  }

  var width = window.screen.availWidth;

  if (!key) {
    throw new Error('API public key required.');
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  }); // always use redirect for small devices
  // if (width <= 479) return redirect(api(platform) + '/apply/start/' + key);

  if (type.toLowerCase() === 'modal') {
    return modal(api(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(api(platform) + '/apply/start/' + key);
  }
};

export default apply;