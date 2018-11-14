import modal from './modal';
import redirect from './redirect';

var height = window.screen.availHeight;
var width = window.screen.availWidth;

var checkout = function checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  // always use redirect for small devices
  if (width <= 479) return redirect(source);

  if (type.toLowerCase() === 'modal') {
    return modal(source);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(source);
  }
};

export default checkout;