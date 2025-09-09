import expect from 'expect'

import checkout from '../../src/lib/checkout';

const source = 'http://localhost:9100';

describe('Checkout', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Modal', () => {
    it('adds a modal overlay to the DOM', () => {
      expect(document.getElementById('creditkey-modal')).toNotExist();

      checkout(source);

      expect(document.getElementById('creditkey-modal')).toExist();
    });

    it('has an iframe with the expected source', () => {
      checkout(source);

      expect(document.getElementById('creditkey-iframe').src).toBe(source + '/?modal=true');
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      checkout(source, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
