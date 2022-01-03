function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Network from '../utils/network';
import modal from './components/modal';
import { frame } from './components/iframes';
import { pdpHost, marketingUI } from '../utils/platform';
var custom = ['culinarydepotinc', 'thewebstaurantstoreinc'];

var Client = /*#__PURE__*/function () {
  function Client(key, platform) {
    if (platform === void 0) {
      platform = 'development';
    }

    this.key = key;
    this.platform = platform;
    this.network = Network(platform);
  }

  var _proto = Client.prototype;

  _proto.begin_checkout = function begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, orderCompleteUrl, mode, merchant_data) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (!cartItems || !billingAddress || !charges || !remoteId || !customerId || !returnUrl || !cancelUrl) {
        return reject('missing required data');
      }

      if (!Array.isArray(cartItems)) {
        return reject('cart items must be an array of CartItem objects');
      } else if (cartItems.filter(function (c) {
        return !c.is_valid_item();
      }).length >= 1) {
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

      return _this.network.post('ecomm/begin_checkout' + _this.key_param, {
        cart_items: cartItems.map(function (item) {
          return item.data;
        }),
        shipping_address: shippingAddress && shippingAddress.data,
        billing_address: billingAddress.data,
        charges: charges.data,
        remote_id: remoteId,
        remote_customer_id: customerId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        order_complete_url: orderCompleteUrl,
        mode: mode || 'modal',
        merchant_data: merchant_data
      }).then(function (res) {
        return resolve(res);
      })["catch"](function (err) {
        return reject(err);
      });
    });
  };

  _proto.is_displayed_in_checkout = function is_displayed_in_checkout(cartItems) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      if (!Array.isArray(cartItems)) {
        return reject('cart items must be an array of CartItem objects');
      } else if (cartItems.filter(function (c) {
        return !c.is_valid_item();
      }).length >= 1) {
        return reject('one or more cart items are invalid');
      }

      return _this2.network.post('ecomm/is_displayed_in_checkout' + _this2.key_param, {
        cart_items: cartItems.map(function (item) {
          return item.data;
        })
      }).then(function (res) {
        return res['is_displayed_in_checkout'] ? resolve(true) : reject(false);
      })["catch"](function (err) {
        return reject(err);
      });
    });
  } // display options are button, text, button_text
  // size options are small, medium, large, special (special loads a special version of the plain logo, instead of a sized badge version)
  // extra options can be:
  // 'special' = renders a special text only version of the pdp
  // 'static' = renders an unlinked version pf the pdp, basically a dumb banner
  // extra is ignored when 'none' or called with type checkout
  ;

  _proto.get_marketing_display = function get_marketing_display(charges, type, display, size, extra) {
    var _this3 = this;

    if (type === void 0) {
      type = "checkout";
    }

    if (display === void 0) {
      display = "button";
    }

    if (size === void 0) {
      size = "medium";
    }

    if (extra === void 0) {
      extra = "none";
    }

    return new Promise(function (resolve, reject) {
      return resolve(_this3.get_checkout_display(charges));
    });
  };

  _proto.enhanced_pdp_modal = function enhanced_pdp_modal(charges, type) {
    if (type === void 0) {
      type = 'pdp';
    }

    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }

    var allowedTypes = ['pdp', 'cart'];
    if (!allowedTypes.includes(type)) return reject('invalid type, allowed types are "pdp", "cart"');
    var url = pdpHost(marketingUI, this.platform) + '/pdp/' + this.key + '/' + type + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return modal(url);
  };

  _proto.get_apply_now = function get_apply_now(type) {
    if (type === void 0) {
      type = 'redirect';
    }

    var url = pdpHost(marketingUI, this.platform) + '/apply.html?' + this.key + '&type=' + type;
    return frame(url);
  };

  _proto.get_checkout_display = function get_checkout_display(charges) {
    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }

    var url = pdpHost(marketingUI, this.platform) + '/checkout.html?' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return frame(url, false);
  } // charges is a charges object
  ;

  _proto.get_pdp_display = function get_pdp_display(charges) {
    var view = 'pdp';
    if (custom.includes(this.key.split('_')[0])) view = this.key.split('_')[0];
    var url = pdpHost(marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return frame(url);
  };

  _proto.get_cart_display = function get_cart_display(charges, desktop, mobile) {
    var view = 'cart';

    if (desktop === void 0) {
      desktop = "right";
    }

    if (mobile === void 0) {
      mobile = "left";
    }

    if (custom.includes(this.key.split('_')[0])) view = this.key.split('_')[0] + "_cart";
    var url = pdpHost(marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&desktop=' + desktop + '&mobile=' + mobile + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return frame(url);
  };

  _proto.get_customer = function get_customer(email, customer_id) {
    if (!email || !customer_id) {
      return Promise.reject('Missing required paramters');
    }

    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(email)) {
      return Promise.reject('Invalid email address');
    }

    return this.network.post('ecomm/customer' + this.key_param, {
      email: email,
      customer_id: customer_id
    });
  };

  _createClass(Client, [{
    key: "key_param",
    get: function get() {
      return '?public_key=' + this.key;
    }
  }]);

  return Client;
}();

export { Client as default };