var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Network from '../utils/network';
import Button from './components/button';
import Text from './components/text';

var Client = function () {
  function Client(key) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'development';

    _classCallCheck(this, Client);

    this.key = key;
    this.network = Network(platform);
  }

  Client.prototype.begin_checkout = function begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode, merchant_data) {
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

      if ((typeof billingAddress === 'undefined' ? 'undefined' : _typeof(billingAddress)) !== 'object') {
        return reject('billing address should be an Address object');
      }

      if ((typeof charges === 'undefined' ? 'undefined' : _typeof(charges)) !== 'object') {
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
        mode: mode || 'modal',
        merchant_data: merchant_data
      }).then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  Client.prototype.is_displayed_in_checkout = function is_displayed_in_checkout(cartItems) {
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
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  // display options are button, text, button_text
  // size options are small, medium, large


  Client.prototype.get_marketing_display = function get_marketing_display(charges) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "checkout";

    var _this3 = this;

    var display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "button";
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";

    if (charges && (typeof charges === 'undefined' ? 'undefined' : _typeof(charges)) !== 'object') {
      return reject('charges should be a charges object');
    }

    var component = void 0;
    switch (display) {
      case "text":
        component = Text;
        break;
      default:
        component = Button;
    }

    return new Promise(function (resolve, reject) {
      return _this3.network.post('ecomm/marketing' + _this3.key_param, { type: type, charges: charges }).then(function (res) {
        return resolve(component(_this3.key, res.text, type, size));
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  Client.prototype.get_customer = function get_customer(email, customer_id) {
    if (!email || !customer_id) {
      return Promise.reject('Missing required paramters');
    }

    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(email)) {
      return Promise.reject('Invalid email address');
    }

    return this.network.post('ecomm/customer' + this.key_param, { email: email, customer_id: customer_id });
  };

  _createClass(Client, [{
    key: 'key_param',
    get: function get() {
      return '?public_key=' + this.key;
    }
  }]);

  return Client;
}();

export { Client as default };