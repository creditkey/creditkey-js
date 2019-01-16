import Network from '../utils/network';

export default class Client {
  constructor(key, platform = 'development') {
    this.key = key;
    this.network = Network(platform);
  }

  get key_param() {
    return '?public_key=' + this.key;
  }

  begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode, merchant_data) {
    return new Promise((resolve, reject) => {
      if (!cartItems || !billingAddress || !charges || !remoteId || !customerId || !returnUrl || !cancelUrl) {
        return reject('missing required data');
      }

      if (!Array.isArray(cartItems)) {
        return reject('cart items must be an array of CartItem objects');
      } else if (cartItems.filter(c => !c.is_valid_item()).length >= 1) {
        return reject('one or more cart items are invalid');
      }

      if (typeof billingAddress !== 'object') {
        return reject('billing address should be a billingAddress object');
      }

      if (typeof charges !== 'object') {
        return reject('charges should be a charges object');
      } else if (!charges.validate_charges()) {
        return reject('charges value is invalid');
      }

      return this.network.post('ecomm/begin_checkout' + this.key_param, {
        cart_items: cartItems.map(item => item.data),
        shipping_address: shippingAddress.data,
        billing_address: billingAddress.data,
        charges: charges.data,
        remote_id: remoteId,
        remote_customer_id: customerId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        mode: mode || 'modal',
        merchant_data
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
  }

  is_displayed_in_checkout(cartItems) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(cartItems)) {
        return reject('cart items must be an array of CartItem objects');
      } else if (cartItems.filter(c => !c.is_valid_item()).length >= 1) {
        return reject('one or more cart items are invalid');
      }

      return this.network.post('ecomm/is_displayed_in_checkout' + this.key_param, {
          cart_items: cartItems.map(item => item.data)
        })
        .then(res => res['is_displayed_in_checkout'] ? resolve(true) : reject(false))
        .catch(err => reject(err));
    });
  }
}
