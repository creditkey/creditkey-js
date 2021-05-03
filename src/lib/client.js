import Network from '../utils/network';
import Button from './components/button';
import Text from './components/text';
import modal from './components/modal';
import modalPdpBanner from './components/modal-pdp-banner';
import { pdpHost, marketingUI } from '../utils/platform';

export default class Client {
  constructor(key, platform = 'development') {
    this.key = key;
    this.platform = platform;
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
        return reject('billing address should be an Address object');
      }

      if (typeof charges !== 'object') {
        return reject('charges should be a Charges object');
      } else if (!charges.validate_charges()) {
        return reject('charges value is invalid');
      }

      return this.network.post('ecomm/begin_checkout' + this.key_param, {
        cart_items: cartItems.map(item => item.data),
        shipping_address: shippingAddress && shippingAddress.data,
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

  // display options are button, text, button_text
  // size options are small, medium, large, special (special loads a special version of the plain logo, instead of a sized badge version)
  // extra options can be: 
  // 'special' = renders a special text only version of the pdp
  // 'static' = renders an unlinked version pf the pdp, basically a dumb banner
  // extra is ignored when 'none' or called with type checkout
  get_marketing_display(charges, type = "checkout", display = "button", size = "medium", extra = "none") {
    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }

    let component;
    switch (display) {
      case "text":
        component = Text;
        break;
      default:
        component = Button;
    }

    return new Promise((resolve, reject) => this.network.post('ecomm/marketing' + this.key_param, { type: type, charges: charges })
      .then(res => resolve(component(this.key, res.text, type, size, res.slug, "", extra, this.platform)))
      .catch(err => reject(err)));
  }

  enhanced_pdp_modal(charges, type = 'pdp') {
    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }

    const allowedTypes = ['pdp', 'cart'];
    if (!allowedTypes.includes(type)) return reject('invalid type, allowed types are "pdp", "cart"');

    const url = pdpHost(marketingUI, this.platform) + '/pdp/' + this.key + '/' + type + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.grand_total].join(',');

    return modal(url);
  }

  // charges is a charges object
  get_pdp_display(charges) {
    const url = pdpHost(marketingUI, this.platform) + '/pdp/' + this.key + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return modalPdpBanner(url);
  }

  get_cart_display(charges, desktop = "right", mobile = "left") {
    const url = pdpHost(marketingUI, this.platform) + '/cart-promo/' + this.key + '/' + desktop + '/' + mobile + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return modalPdpBanner(url);
  }

  get_customer(email, customer_id) {
    if (!email || !customer_id) {
      return Promise.reject('Missing required paramters');
    }

    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(email)) {
      return Promise.reject('Invalid email address');
    }

    return this.network.post('ecomm/customer' + this.key_param, { email: email, customer_id: customer_id });
  }
}
