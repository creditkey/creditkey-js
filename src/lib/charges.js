export default class Charges {
  constructor(total, shipping, tax, discountAmount, grandTotal) {
    this.data = {
      total: total,
      shipping: shipping,
      tax: tax,
      discountAmount: discountAmount,
      grandTotal: grandTotal 
    }
  }

  validate_charges() {
    if (this.data.shipping && !this.is_valid_money_value(this.data.shipping)) return false;
    if (this.data.tax && !this.is_valid_money_value(this.data.tax)) return false;
    if (this.data.discountAmount && !this.is_valid_money_value(this.data.discountAmount)) return false;

    if (!this.is_valid_money_value(this.data.total) ||
        !this.is_valid_money_value(this.data.grandTotal)) {
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
