export default class Charges {
  constructor(total, shipping, tax, discountAmount, grandTotal) {
    this.charges = {
      total: total,
      shipping: shipping,
      tax: tax,
      discountAmount: discountAmount,
      grandTotal: grandTotal 
    }
  }

  validate_charges() {
    if (this.charges.shipping && !this.is_valid_money_value(this.charges.shipping)) return false;
    if (this.charges.tax && !this.is_valid_money_value(this.charges.tax)) return false;
    if (this.charges.discountAmount && !this.is_valid_money_value(this.charges.discountAmount)) return false;

    if (!this.is_valid_money_value(this.charges.total) ||
        !this.is_valid_money_value(this.charges.grandTotal)) {
      return false;
    }

    return true;
  }

  is_valid_money_value(value) {
    const num = +value;
    if (isNaN(num)) return false;

    return true;
  }
}
