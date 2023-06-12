import modal from './components/modal';
import redirect from './redirect';
import { api } from '../utils/platform';

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
}

export default apply;
