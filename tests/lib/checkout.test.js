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

    it('preserves modal content when hidden via ESC and reshown', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      const iframe = document.getElementById('creditkey-iframe');
      const originalSrc = iframe.src;
      expect(modal).toExist();
      expect(iframe).toExist();

      // Hide modal via ESC key
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(escEvent);
      expect(modal.style.display).toBe('none');

      // Reshow modal with same source - should preserve content
      checkout(source);
      
      const sameModal = document.getElementById('creditkey-modal');
      const sameIframe = document.getElementById('creditkey-iframe');
      expect(sameModal).toBe(modal); // Should be the same DOM element
      expect(sameIframe).toBe(iframe); // Should be the same iframe element
      expect(sameIframe.src).toBe(originalSrc); // Should have same source
      expect(sameModal.style.display).toBe('flex'); // Should be visible again
    });

    it('preserves modal content when hidden via background click and reshown', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      const iframe = document.getElementById('creditkey-iframe');
      const background = document.querySelector('.ck-modal-background');
      const originalSrc = iframe.src;
      
      // Hide modal via background click
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { 
        value: background, 
        enumerable: true 
      });
      background.dispatchEvent(clickEvent);
      expect(modal.style.display).toBe('none');

      // Reshow modal with same source - should preserve content
      checkout(source);
      
      const sameModal = document.getElementById('creditkey-modal');
      const sameIframe = document.getElementById('creditkey-iframe');
      expect(sameModal).toBe(modal); // Should be the same DOM element
      expect(sameIframe).toBe(iframe); // Should be the same iframe element
      expect(sameIframe.src).toBe(originalSrc); // Should have same source
      expect(sameModal.style.display).toBe('flex'); // Should be visible again
    });

    it('preserves modal content and ESC functionality when hidden via iframe cancel and reshown', () => {
      // Create the modal
      checkout(source);

      const modal = document.getElementById('creditkey-modal');
      const iframe = document.getElementById('creditkey-iframe');
      const originalSrc = iframe.src;
      
      // Simulate iframe 'cancel' event (like user canceling from within iframe)
      const cancelEvent = {
        data: JSON.stringify({ action: 'cancel', type: 'modal' })
      };
      window.dispatchEvent(new MessageEvent('message', cancelEvent));
      expect(modal.style.display).toBe('none');

      // Reshow modal with same source - should preserve content AND functionality
      checkout(source);
      
      const sameModal = document.getElementById('creditkey-modal');
      const sameIframe = document.getElementById('creditkey-iframe');
      expect(sameModal).toBe(modal); // Should be the same DOM element
      expect(sameIframe).toBe(iframe); // Should be the same iframe element
      expect(sameIframe.src).toBe(originalSrc); // Should have same source
      expect(sameModal.style.display).toBe('flex'); // Should be visible again
      
      // ESC functionality should still work after reshow
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 });
      document.dispatchEvent(escEvent);
      expect(sameModal.style.display).toBe('none'); // Should hide again via ESC
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
        checkout(source);

        // Should have called scrollTo with top: 0
        expect(scrollToCalls.length).toBe(1);
        expect(scrollToCalls[0].top).toBe(0);
        expect(scrollToCalls[0].left).toBe(0);
        expect(scrollToCalls[0].behavior).toBe('smooth');

        // Reset calls array
        scrollToCalls = [];

        const modal = document.getElementById('creditkey-modal');
        // Hide the modal
        modal.style.display = 'none';

        // Reshow the modal
        checkout(source);

        // Should have called scrollTo again when reshowing
        expect(scrollToCalls.length).toBe(1);
        expect(scrollToCalls[0].top).toBe(0);
        expect(scrollToCalls[0].left).toBe(0);
        expect(scrollToCalls[0].behavior).toBe('smooth');
      } finally {
        // Restore original scrollTo
        window.scrollTo = originalScrollTo;
      }
    });
  });

  describe('Redirect', () => {
    xit('redirects to the specified source', () => {
      checkout(source, 'redirect');

      expect(global.window.location.href).toBe(source);
    });
  });
});
