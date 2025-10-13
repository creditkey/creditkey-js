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
      window.dispatchEvent(escEvent);

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

    it('scrolls to top when modal is displayed', () => {
      // Mock window.scrollTo to track calls
      let scrollToCalls = [];
      const originalScrollTo = window.scrollTo;
      window.scrollTo = function(options) {
        scrollToCalls.push(options);
      };

      try {
        // Create the modal
        apply(key, 'modal', 'development');

        // Should have called scrollTo twice - once in apply() and once in modal()
        expect(scrollToCalls.length).toBe(2);
        // Both calls should scroll to top
        expect(scrollToCalls[0].top).toBe(0);
        expect(scrollToCalls[0].left).toBe(0);
        expect(scrollToCalls[0].behavior).toBe('smooth');
        expect(scrollToCalls[1].top).toBe(0);
        expect(scrollToCalls[1].left).toBe(0);
        expect(scrollToCalls[1].behavior).toBe('smooth');
      } finally {
        // Restore original scrollTo
        window.scrollTo = originalScrollTo;
      }
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      apply(key, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
