"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var Charges = exports["default"] = /*#__PURE__*/function () {
  function Charges(total, shipping, tax, discount_amount, grand_total) {
    this.data = {
      total: total,
      shipping: shipping,
      tax: tax,
      discount_amount: discount_amount,
      grand_total: grand_total
    };
  }
  var _proto = Charges.prototype;
  _proto.validate_charges = function validate_charges() {
    if (this.data.shipping && !this.is_valid_money_value(this.data.shipping)) return false;
    if (this.data.tax && !this.is_valid_money_value(this.data.tax)) return false;
    if (this.data.discount_amount && !this.is_valid_money_value(this.data.discount_amount)) return false;
    if (!this.is_valid_money_value(this.data.total) || !this.is_valid_money_value(this.data.grand_total)) {
      return false;
    }
    return true;
  };
  _proto.is_valid_money_value = function is_valid_money_value(value) {
    var num = +value;
    if (isNaN(num)) return false;
    return true;
  };
  return Charges;
}();
module.exports = exports.default;