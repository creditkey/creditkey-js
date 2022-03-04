import modal from './components/modal';
import redirect from './redirect';
import { api } from '../utils/platform';

const width = window.screen.availWidth;

const apply = (key, type = 'modal', platform = 'production') => {
  if (!key) {
    throw new Error('API public key required.');
  }

  // always use redirect for small devices
  if (width <= 479) return redirect(api(platform) + '/apply/start/' + key);

  if (type.toLowerCase() === 'modal') {
    return modal(api(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(api(platform) + '/apply/start/' + key);
  }
}

export default apply;
