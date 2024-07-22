import modal from './components/modal';
import redirect from './redirect';
var checkout = function checkout(source, type, completionCallback) {
  if (type === void 0) {
    type = 'modal';
  }
  var width = window.screen.availWidth;
  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source, completionCallback);
  } else {
    return redirect(source);
  }
};
export default checkout;