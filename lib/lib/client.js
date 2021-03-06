"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _network = _interopRequireDefault(require("../utils/network"));

var _button = _interopRequireDefault(require("./components/button"));

var _text = _interopRequireDefault(require("./components/text"));

var _modal = _interopRequireDefault(require("./components/modal"));

var _platform = require("../utils/platform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client = /*#__PURE__*/function () {
  function Client(key, platform) {
    if (platform === void 0) {
      platform = 'development';
    }

    this.key = key;
    this.platform = platform;
    this.network = (0, _network["default"])(platform);
  }

  var _proto = Client.prototype;

  _proto.begin_checkout = function begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, mode, merchant_data) {
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

    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }

    var component;

    switch (display) {
      case "text":
        component = _text["default"];
        break;

      default:
        component = _button["default"];
    }

    return new Promise(function (resolve, reject) {
      return _this3.network.post('ecomm/marketing' + _this3.key_param, {
        type: type,
        charges: charges
      }).then(function (res) {
        return resolve(component(_this3.key, res.text, type, size, res.slug, "", extra, _this3.platform));
      })["catch"](function (err) {
        return reject(err);
      });
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
    var url = (0, _platform.pdpHost)(_platform.ui, this.platform) + '/pdp/' + this.key + '/' + type + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.grand_total].join(',');
    return (0, _modal["default"])(url);
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

exports["default"] = Client;
module.exports = exports.default;