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

    it('closes the modal when ESC key is pressed', () => {
      apply(key, 'modal', 'development');

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.style.display).toBe('');

      // Simulate ESC key press
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(escEvent);

      // Modal should be hidden (display: none)
      expect(modal.style.display).toBe('none');
    });

    it('closes the modal when background is clicked', () => {
      apply(key, 'modal', 'development');

      const modal = document.getElementById('creditkey-modal');
      const background = document.querySelector('.ck-modal-background');
      expect(modal).toExist();
      expect(background).toExist();

      // Simulate background click
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { 
        value: background, 
        enumerable: true 
      });
      background.dispatchEvent(clickEvent);

      // Modal should be hidden (display: none)
      expect(modal.style.display).toBe('none');
    });

    it('sets focus to the modal element when created', () => {
      apply(key, 'modal', 'development');

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      apply(key, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
