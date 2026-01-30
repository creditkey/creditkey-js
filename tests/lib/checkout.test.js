// Vitest provides expect globally

import checkout from '../../src/lib/checkout';

const source = 'http://localhost:9100';

describe('Checkout', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Modal', () => {
    it('adds a modal overlay to the DOM', () => {
      expect(document.getElementById('creditkey-modal')).toBeFalsy();

      checkout(source);

      expect(document.getElementById('creditkey-modal')).toBeTruthy();
    });

    it('has an iframe with the expected source', () => {
      checkout(source);

      expect(document.getElementById('creditkey-iframe').src).toBe(source + '/?modal=true');
    });
  });

  describe('Redirect', () => {
    it.skip('redirects to the specified source', () => {
      checkout(source, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
