import modal from './components/modal';
import redirect from './redirect';

const checkout = (source, type = 'modal') => {

  let width = window.screen.availWidth;

  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source);
  } else {
    return redirect(source);
  }
}

export default checkout;
