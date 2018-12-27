import modal from './modal';
import redirect from './redirect';
import { api } from '../utils/platform';

var width = window.screen.availWidth;

var apply = function apply(key) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';
  var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'production';

  if (!key) {
    throw new Error('API public key required.');
  }

  // always use redirect for small devices
  if (width <= 479) return redirect(source);

  if (type.toLowerCase() === 'modal') {
    return modal(api(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(api(platform) + '/apply/start/' + key);
  }
};

export default apply;