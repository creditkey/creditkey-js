var CartItem = /*#__PURE__*/function () {
  function CartItem(merchantProductId, name, price, sku, quantity, size, color) {
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
  var _proto = CartItem.prototype;
  _proto.is_valid_item = function is_valid_item() {
    return !!(this.data.merchant_id && this.data.name);
  };
  return CartItem;
}();
export { CartItem as default };