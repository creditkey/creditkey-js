import Network from '../utils/network';

export default class Client {
  constructor(key, platform = 'development') {
    this.key = key;
    this.network = Network(platform);
  }

  get key_param() {
    return '?public_key=' + this.key;
  }

  begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode) {
    return new Promise((resolve, reject) => {
      if (!cartItems || !billingAddress || !charges || !remoteId || !customerId || !returnUrl || !cancelUrl) {
        reject('missing required data');
      }

      if (!Array.isArray(cartItems)) {
        reject('cart items must be an array of CartItem objects');
      } else if (cartItems.filter(c => !c.is_valid_item()).length >= 1) {
        reject('one or more cart items are invalid');
      }

      if (typeof billingAddress !== 'object') {
        reject('billing address should be a billingAddress object');
      }

      if (typeof charges !== 'object') {
        reject('charges should be a charges object');
      } else if (charges.filter(c => !c.validate_charges()).length >= 1) {
        reject('one or more charges value is invalid');
      }

      return this.network.post('ecomm/begin_checkout', {
        cart_items: cartItems,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        charges: charges,
        remote_id: remoteId,
        remote_customer_id: customerId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        mode: mode || 'modal'
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
  }

  is_displayed_in_checkout() {
    return new Promise((resolve, reject) => {
      return this.network.post('ecomm/is_displayed_in_checkout' + this.key_param)
        .then(res => res['is_displayed_in_checkout'] ? resolve(true) : reject(false))
        .catch(err => reject(err));
    });
  }
}
