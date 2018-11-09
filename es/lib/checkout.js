import Modal from './modal';
import Redirect from './redirect';

var height = window.screen.availHeight;
var width = window.screen.availWidth;

var Checkout = function Checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  // always use redirect for small devices
  if (width <= 479) return Redirect(source);

  if (type.toLowerCase() === 'modal') {
    return Modal(source);
  }
};

export default Checkout;