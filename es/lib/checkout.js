import Modal from './modal';

var Checkout = function Checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  if (type.toLowerCase() === 'modal') {
    return Modal(source);
  }
};

export default Checkout;