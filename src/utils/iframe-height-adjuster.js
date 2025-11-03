/**
 * CreditKey PDP Iframe Height Auto-Adjuster
 * 
 * This utility should be included in iframe content (e.g., pdp.html, cart.html, etc.)
 * to automatically send height updates to the parent window based on the body element height.
 * 
 * Usage:
 * Simply include this script in your iframe content:
 * <script src="path/to/iframe-height-adjuster.js"></script>
 * 
 * The script will automatically:
 * - Send initial height on page load
 * - Monitor for content changes and update height accordingly
 * - Use the body element's scrollHeight for accurate measurement
 */

(function() {
  'use strict';

  let lastHeight = 0;

  /**
   * Calculate the current height of the body element
   * @returns {number} The height in pixels
   */
  function getBodyHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  /**
   * Send height update to parent window
   */
  function updateParentHeight() {
    const currentHeight = getBodyHeight();
    
    // Only send update if height has changed
    if (currentHeight !== lastHeight) {
      const message = {
        action: 'height',
        type: 'pdp',
        options: currentHeight
      };
      
      try {
        window.parent.postMessage(JSON.stringify(message), '*');
        lastHeight = currentHeight;
      } catch (e) {
        console.error('Failed to send height update:', e);
      }
    }
  }

  /**
   * Initialize height monitoring
   */
  function init() {
    // Send initial height once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for styles to apply
        setTimeout(updateParentHeight, 100);
      });
    } else {
      updateParentHeight();
    }

    // Update height after all resources (images, etc.) are loaded
    window.addEventListener('load', function() {
      setTimeout(updateParentHeight, 100);
    });

    // Monitor for DOM changes using MutationObserver
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function() {
        updateParentHeight();
      });

      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    // Fallback: check periodically in case MutationObserver misses changes
    setInterval(updateParentHeight, 500);

    // Update on window resize
    window.addEventListener('resize', function() {
      setTimeout(updateParentHeight, 100);
    });
  }

  // Start monitoring
  init();
})();
