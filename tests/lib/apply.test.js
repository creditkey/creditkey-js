import expect from 'expect'

import apply from '../../src/lib/apply';
import { api } from '../../src/utils/platform';

const key = 'testkey_123456789';

describe('Apply Now', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Modal', () => {
    it('should throw an exception', () => {
      expect(() => apply()).toThrow(/required/);
    });

    it('adds a modal overlay to the DOM', () => {
      expect(document.getElementById('creditkey-modal')).toNotExist();

      apply(key, 'modal', 'development');

      expect(document.getElementById('creditkey-modal')).toExist();
    });

    it('has an iframe with the expected source', () => {
      apply(key, 'modal', 'development');
      const host = api('development');

      expect(document.getElementById('creditkey-iframe').src).toBe(`${host}/apply/modal/start/${key}?modal=true`);
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      apply(key, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
