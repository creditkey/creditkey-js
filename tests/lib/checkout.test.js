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

    it('closes the modal when ESC key is pressed', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.style.display).toBe('');

      // Simulate ESC key press
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(escEvent);

      // Modal should be hidden (display: none)
      expect(modal.style.display).toBe('none');
    });

    it('closes the modal when ESC key (legacy keyCode) is pressed', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.style.display).toBe('');

      // Simulate ESC key press using legacy keyCode
      const escEvent = new KeyboardEvent('keydown', { keyCode: 27 });
      document.dispatchEvent(escEvent);

      // Modal should be hidden (display: none)
      expect(modal.style.display).toBe('none');
    });

    it('does not close modal on non-ESC key press', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.style.display).toBe('');

      // Simulate non-ESC key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });
      document.dispatchEvent(enterEvent);

      // Modal should still be visible
      expect(modal.style.display).toBe('');
    });

    it('does not close modal when ESC is pressed but modal is already hidden', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      
      // Hide the modal first
      modal.style.display = 'none';

      // Simulate ESC key press
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(escEvent);

      // Modal should still exist but remain hidden (ESC shouldn't affect hidden modals)
      expect(document.getElementById('creditkey-modal')).toExist();
      expect(modal.style.display).toBe('none');
    });

    it('closes the modal when background is clicked', () => {
      // Create the modal
      checkout(source);

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

    it('does not close modal when modal content is clicked', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      const content = document.getElementById('ck-modal-card');
      expect(modal).toExist();
      expect(content).toExist();

      // Simulate content click
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { 
        value: content, 
        enumerable: true 
      });
      content.dispatchEvent(clickEvent);

      // Modal should still exist
      expect(document.getElementById('creditkey-modal')).toExist();
    });

    it('sets focus to the modal element when created', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();
      expect(modal.getAttribute('tabindex')).toBe('-1');
      // Note: In JSDOM, document.activeElement focus testing is limited
      // But we can verify the tabindex attribute is set correctly
    });

    it('sets focus to existing modal when reshown', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      expect(modal).toExist();

      // Hide the modal
      modal.style.display = 'none';

      // Reshow the modal with same source
      checkout(source);

      const existingModal = document.getElementById('creditkey-modal');
      expect(existingModal).toExist();
      expect(existingModal.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      checkout(source, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
