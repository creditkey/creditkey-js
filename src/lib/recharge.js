import modal from './components/modal';
import redirect from './redirect';
import { rechargeUI } from '../utils/platform';

const recharge = (key, type = 'modal', platform = 'production') => {

  if (!key) {
    throw new Error('API public key required.');
  }

  window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  if (type.toLowerCase() === 'modal') {
    return modal(rechargeUI(platform) + '/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(rechargeUI(platform) + '/' + key);
  }
}

export default recharge;
