import expect from 'expect'

import { frame } from '../../src/lib/components/iframes';

describe('Iframes', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
  });

  describe('PDP iframe', () => {
    it('creates an iframe with the creditkey-pdp-iframe id', () => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      expect(iframe.getAttribute('src')).toBe(testUrl);
    });

    it('handles dynamic height updates via postMessage', (done) => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      
      // Store initial height
      const initialHeight = iframe.style.height;
      
      // Simulate postMessage from iframe with height update
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({
          action: 'height',
          type: 'pdp',
          options: 150
        }),
        origin: 'http://localhost:9100'
      });
      
      window.dispatchEvent(messageEvent);
      
      // Give a small delay for the event to process
      setTimeout(() => {
        expect(iframe.style.height).toBe('150px');
        expect(iframe.style.height).toNotBe(initialHeight);
        done();
      }, 50);
    });

    it('ignores invalid height values in postMessage', (done) => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      
      // Set an initial height
      iframe.style.height = '100px';
      const initialHeight = iframe.style.height;
      
      // Simulate postMessage with invalid height
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({
          action: 'height',
          type: 'pdp',
          options: 'invalid'
        }),
        origin: 'http://localhost:9100'
      });
      
      window.dispatchEvent(messageEvent);
      
      // Give a small delay for the event to process
      setTimeout(() => {
        // Height should remain unchanged
        expect(iframe.style.height).toBe(initialHeight);
        done();
      }, 50);
    });

    it('ignores negative height values in postMessage', (done) => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      
      // Set an initial height
      iframe.style.height = '100px';
      const initialHeight = iframe.style.height;
      
      // Simulate postMessage with negative height
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({
          action: 'height',
          type: 'pdp',
          options: -50
        }),
        origin: 'http://localhost:9100'
      });
      
      window.dispatchEvent(messageEvent);
      
      // Give a small delay for the event to process
      setTimeout(() => {
        // Height should remain unchanged
        expect(iframe.style.height).toBe(initialHeight);
        done();
      }, 50);
    });

    it('ignores height messages without pdp type', (done) => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      
      // Set an initial height
      iframe.style.height = '100px';
      const initialHeight = iframe.style.height;
      
      // Simulate postMessage without pdp type
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify({
          action: 'height',
          type: 'modal',
          options: 200
        }),
        origin: 'http://localhost:9100'
      });
      
      window.dispatchEvent(messageEvent);
      
      // Give a small delay for the event to process
      setTimeout(() => {
        // Height should remain unchanged for PDP iframe
        expect(iframe.style.height).toBe(initialHeight);
        done();
      }, 50);
    });

    it('creates iframe with pointer-events disabled when pointer is false', () => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl, false);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      expect(iframe.style.pointerEvents).toBe('none');
    });

    it('creates iframe with pointer-events enabled by default', () => {
      const testUrl = 'http://localhost:9100/pdp.html';
      const iframeHtml = frame(testUrl);
      
      document.body.insertAdjacentHTML('beforeend', iframeHtml);
      
      const iframe = document.getElementById('creditkey-pdp-iframe');
      expect(iframe).toExist();
      expect(iframe.style.pointerEvents).toNotBe('none');
    });
  });
});
