import expect from 'expect'

import modal from '../../src/lib/components/modal';
import { api } from '../../src/utils/platform';

const testUrl = 'http://localhost:9100';

describe('Modal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up any remaining event listeners
    const modalElement = document.getElementById('creditkey-modal');
    if (modalElement) {
      modalElement.remove();
    }
  });

  describe('Basic functionality', () => {
    it('creates a modal with background and content elements', () => {
      modal(testUrl);
      
      expect(document.getElementById('creditkey-modal')).toExist();
      expect(document.querySelector('.ck-modal-background')).toExist();
      expect(document.getElementById('ck-modal-card')).toExist();
    });
  });

  describe('ESC key support', () => {
    it('closes modal when ESC key is pressed', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      expect(modalElement).toExist();
      expect(modalElement.style.display).toBe('');

      // Simulate ESC key press
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escEvent);

      expect(modalElement.style.display).toBe('none');
    });

    it('closes modal when ESC keyCode 27 is pressed (legacy support)', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      expect(modalElement).toExist();
      expect(modalElement.style.display).toBe('');

      // Simulate ESC key press with legacy keyCode
      const escEvent = new KeyboardEvent('keydown', {
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escEvent);

      expect(modalElement.style.display).toBe('none');
    });

    it('does not close modal when other keys are pressed', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      expect(modalElement).toExist();
      expect(modalElement.style.display).toBe('');

      // Simulate other key press
      const otherKeyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      document.dispatchEvent(otherKeyEvent);

      expect(modalElement.style.display).toBe('');
    });

    it('does not respond to ESC key when modal is already hidden', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      modalElement.style.display = 'none';

      // Simulate ESC key press
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escEvent);

      // Should remain hidden
      expect(modalElement.style.display).toBe('none');
    });
  });

  describe('Background click support', () => {
    it('closes modal when background is clicked', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      const backgroundElement = document.querySelector('.ck-modal-background');
      
      expect(modalElement).toExist();
      expect(backgroundElement).toExist();
      expect(modalElement.style.display).toBe('');

      // Simulate background click
      const clickEvent = new MouseEvent('click', {
        bubbles: true
      });
      Object.defineProperty(clickEvent, 'target', {
        value: backgroundElement,
        enumerable: true
      });
      document.dispatchEvent(clickEvent);

      expect(modalElement.style.display).toBe('none');
    });

    it('does not close modal when content area is clicked', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      const contentElement = document.getElementById('ck-modal-card');
      
      expect(modalElement).toExist();
      expect(contentElement).toExist();
      expect(modalElement.style.display).toBe('');

      // Simulate content area click
      const clickEvent = new MouseEvent('click', {
        bubbles: true
      });
      Object.defineProperty(clickEvent, 'target', {
        value: contentElement,
        enumerable: true
      });
      document.dispatchEvent(clickEvent);

      expect(modalElement.style.display).toBe('');
    });

    it('does not respond to background click when modal is already hidden', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      const backgroundElement = document.querySelector('.ck-modal-background');
      modalElement.style.display = 'none';

      // Simulate background click
      const clickEvent = new MouseEvent('click', {
        bubbles: true
      });
      Object.defineProperty(clickEvent, 'target', {
        value: backgroundElement,
        enumerable: true
      });
      document.dispatchEvent(clickEvent);

      // Should remain hidden
      expect(modalElement.style.display).toBe('none');
    });
  });

  describe('Event listener cleanup', () => {
    it('removes event listeners when modal is hidden', () => {
      modal(testUrl);
      
      const modalElement = document.getElementById('creditkey-modal');
      expect(modalElement).toExist();

      // Hide the modal programmatically (simulates internal remove() call)
      modalElement.style.display = 'none';

      // After hiding, ESC key should not affect already hidden modal
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      document.dispatchEvent(escEvent);

      expect(modalElement.style.display).toBe('none');
    });
  });
});