/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Eben Goodman
 * Released under the MIT License
 */
'use strict';

class CartItem {
  constructor(merchantProductId, name, price, sku, quantity, size, color) {
    this.data = {
      merchant_id: merchantProductId,
      name: name,
      price: price,
      sku: sku,
      quantity: quantity,
      size: size,
      color: color
    };
  }
  is_valid_item() {
    return !!(this.data.merchant_id && this.data.name);
  }
}

module.exports = CartItem;
//# sourceMappingURL=cart-item.js.map
