import Modal from './modal';

const Checkout = (source, type = 'modal') => {
  if (type.toLowerCase() === 'modal') {
    return Modal(source);
  }
}

export default Checkout;
