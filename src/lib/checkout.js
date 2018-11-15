import modal from './modal';
import redirect from './redirect';

const height = window.screen.availHeight;
const width = window.screen.availWidth;

const checkout = (source, type = 'modal') => {
  // always use redirect for small devices
  if (width <= 479) return redirect(source);

  if (type.toLowerCase() === 'modal') {
    return modal(source);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(source);
  }
}

export default checkout;
