import Modal from './modal';
import Redirect from './redirect';

const height = window.screen.availHeight;
const width = window.screen.availWidth;

const Checkout = (source, type = 'modal') => {
  // always use redirect for small devices
  if (width <= 479) return Redirect(source);

  if (type.toLowerCase() === 'modal') {
    return Modal(source);
  }
}

export default Checkout;
