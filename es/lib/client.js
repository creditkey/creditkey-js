var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Network from '../utils/network';

var Client = function () {
  function Client(key) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'development';

    _classCallCheck(this, Client);

    this.key = key;
    this.network = Network(platform);
  }

  Client.prototype.begin_checkout = function begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (!cartItems || !billingAddress || !charges || !remoteId || !customerId || !returnUrl || !cancelUrl) {
        reject('missing required data');
      }

      if (!Array.isArray(cartItems)) {
        reject('cart items must be an array of cart objects');
      }

      return _this.network.post('ecomm/begin_checkout', {
        cart_items: cartItems,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        charges: charges,
        remote_id: remoteId,
        remote_customer_id: customerId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        mode: mode || 'modal'
      }).then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  Client.prototype.is_displayed_in_checkout = function is_displayed_in_checkout() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      return _this2.network.post('ecomm/is_displayed_in_checkout' + _this2.key_param).then(function (res) {
        return res['is_displayed_in_checkout'] ? resolve(true) : reject(false);
      }).catch(function (err) {
        return reject(err);
      });
    });
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