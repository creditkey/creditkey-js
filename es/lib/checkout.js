import modal from './components/modal';
import redirect from './redirect';
var height = window.screen.availHeight;
var width = window.screen.availWidth;

var checkout = function checkout(source, type) {
  if (type === void 0) {
    type = 'modal';
  }

  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source);
  } else {
    return redirect(source);
  }
};

export default checkout;