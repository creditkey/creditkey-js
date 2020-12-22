import modal from './components/modal';
import redirect from './redirect';

const height = window.screen.availHeight;
const width = window.screen.availWidth;

const checkout = (source, type = 'modal') => {
  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source);
  } else {
    return redirect(source);
  }
}

export default checkout;
