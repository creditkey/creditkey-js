import expect from 'expect'

import CartItem from '../../src/lib/cart-item';

describe('CartItem', () => {
  describe('cart item validations', () => {
    it('rejects cart item with invalid merchant id', () => {
      const item = new CartItem(null, 'Some Item', '100.00');
      expect(item.is_valid_item()).toBe(false);
    });

    it('rejects cart item with invalid name', () => {
      const item = new CartItem(1, null, '100.00');
      expect(item.is_valid_item()).toBe(false);
    });

    it('rejects cart item with invalid price', () => {
      const item = new CartItem(1, 'Some Item', null);
      expect(item.is_valid_item()).toBe(false);
    });

    it('accepts a valid cart item', () => {
      const item = new CartItem(1, 'Some Item', '100.00');
      expect(item.is_valid_item()).toBe(true);
    });
  });
});
