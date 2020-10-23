function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CartItem = function () {
  function CartItem(merchantProductId, name, price, sku, quantity, size, color) {
    _classCallCheck(this, CartItem);

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

  CartItem.prototype.is_valid_item = function is_valid_item() {
    return !!(this.data.merchant_id && this.data.name);
  };

  return CartItem;
}();

export { CartItem as default };