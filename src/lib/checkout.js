import modal from './components/modal';
import redirect from './redirect';

const height = window.screen.availHeight;
const width = window.screen.availWidth;

const checkout = (source, type = 'modal') => {
  if (type.toLowerCase() === 'modal') {
    return modal(source);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(source);
  }
}

export default checkout;
