"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _network = _interopRequireDefault(require("../utils/network"));
var _modal = _interopRequireDefault(require("./components/modal"));
var _iframes = require("./components/iframes");
var _platform = require("../utils/platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Client = exports["default"] = /*#__PURE__*/function () {
  function Client(key, platform) {
    if (platform === void 0) {
      platform = 'development';
    }
    this.key = key;
    this.platform = platform;
    this.network = (0, _network["default"])(platform);
  }
  var _proto = Client.prototype;
  _proto.begin_checkout = function begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, orderCompleteUrl, mode, merchant_data) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (!cartItems || !billingAddress || !charges || !customerId || !returnUrl || !cancelUrl) {
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
  }

  // display options are button, text, button_text
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
    var url = (0, _platform.pdpHost)(_platform.marketingUI, this.platform) + '/pdp/' + this.key + '/' + type + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return (0, _modal["default"])(url);
  };
  _proto.get_apply_now = function get_apply_now(type, charges) {
    var url = (0, _platform.pdpHost)(_platform.marketingUI, this.platform) + '/apply.html?public_key=' + this.key + '&type=' + type + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return (0, _iframes.frame)(url);
  };
  _proto.get_checkout_display = function get_checkout_display(charges) {
    if (charges && typeof charges !== 'object') {
      return reject('charges should be a charges object');
    }
    var url = (0, _platform.pdpHost)(_platform.marketingUI, this.platform) + '/checkout.html?public_key=' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return (0, _iframes.frame)(url, false);
  }

  // charges is a charges object
  ;
  _proto.get_pdp_display = function get_pdp_display(charges) {
    var view = 'pdp';
    var url = (0, _platform.pdpHost)(_platform.marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return (0, _iframes.frame)(url);
  };
  _proto.get_cart_display = function get_cart_display(charges, desktop, mobile) {
    var view = 'cart';
    if (desktop === void 0) {
      desktop = "right";
    }
    if (mobile === void 0) {
      mobile = "left";
    }
    var url = (0, _platform.pdpHost)(_platform.marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&desktop=' + desktop + '&mobile=' + mobile + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
    return (0, _iframes.frame)(url);
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
  return _createClass(Client, [{
    key: "key_param",
    get: function get() {
      return '?public_key=' + this.key;
    }
  }]);
}();
module.exports = exports.default;