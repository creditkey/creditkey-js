/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Eben Goodman
 * Released under the MIT License
 */
import modal from './components/modal.js';
import redirect from './redirect.js';
import { api } from '../utils/platform.js';

const apply = (key, type = 'modal', platform = 'production') => {
  if (!key) {
    throw new Error('API public key required.');
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  if (type.toLowerCase() === 'modal') {
    return modal(api(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(api(platform) + '/apply/start/' + key);
  }
};

export { apply as default };
//# sourceMappingURL=apply.js.map
