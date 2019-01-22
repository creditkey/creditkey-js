"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Charges = function () {
  function Charges(total, shipping, tax, discount_amount, grand_total) {
    _classCallCheck(this, Charges);

    this.data = {
      total: total,
      shipping: shipping,
      tax: tax,
      discount_amount: discount_amount,
      grand_total: grand_total
    };
  }

  Charges.prototype.validate_charges = function validate_charges() {
    if (this.data.shipping && !this.is_valid_money_value(this.data.shipping)) return false;
    if (this.data.tax && !this.is_valid_money_value(this.data.tax)) return false;
    if (this.data.discount_amount && !this.is_valid_money_value(this.data.discount_amount)) return false;

    if (!this.is_valid_money_value(this.data.total) || !this.is_valid_money_value(this.data.grand_total)) {
      return false;
    }

    return true;
  };

  Charges.prototype.is_valid_money_value = function is_valid_money_value(value) {
    var num = +value;
    if (isNaN(num)) return false;

    return true;
  };

  return Charges;
}();

exports.default = Charges;
module.exports = exports["default"];