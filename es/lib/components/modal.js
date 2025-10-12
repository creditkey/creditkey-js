import styles from '../../styles/index.css';
import { api } from '../../utils/platform';

// Global keydown handler for ESC key
var escKeyHandler = null;
var backgroundClickHandler = null;
function registerBackgroundClickHandler() {
  // Remove existing handler if any to avoid duplicates
  removeBackgroundClickHandler();
  backgroundClickHandler = function backgroundClickHandler(event) {
    // Only close if the clicked element is the background itself
    if (event.target && event.target.classList.contains('ck-modal-background')) {
      var _modal = document.getElementById('creditkey-modal');
      // Only close if modal exists and is visible
      if (_modal && _modal.style.display !== 'none') {
        remove(); // Hide the modal on background click
      }
    }
  };

  // Add click listener to the document to catch background clicks
  document.addEventListener('click', backgroundClickHandler);
}
function removeBackgroundClickHandler() {
  if (backgroundClickHandler) {
    document.removeEventListener('click', backgroundClickHandler);
    backgroundClickHandler = null;
  }
}
function registerEscKeyHandler() {
  // Remove existing handler if any to avoid duplicates
  removeEscKeyHandler();
  escKeyHandler = function escKeyHandler(event) {
    // Check if ESC key was pressed (key code 27 or key 'Escape')
    if (event.key === 'Escape' || event.keyCode === 27) {
      var _modal2 = document.getElementById('creditkey-modal');
      // Only close if modal exists and is visible
      if (_modal2 && _modal2.style.display !== 'none') {
        remove(); // Hide the modal on ESC key press
      }
    }
  };
  document.addEventListener('keydown', escKeyHandler);
}
function removeEscKeyHandler() {
  if (escKeyHandler) {
    document.removeEventListener('keydown', escKeyHandler);
    escKeyHandler = null;
  }
}
var _modal3 = function modal(source, completionCallback) {
  registerPostMessageCallback(completionCallback);

  // Check to see if we've already created the modal - but hidden it when the user clicked off.
  // If so, simply redisplay the modal.
  var existingModal = document.getElementById('creditkey-modal');
  var sourceUrl = new URL(source);
  sourceUrl.searchParams.append('modal', true);
  if (existingModal !== null) {
    var iframe = document.getElementById('creditkey-iframe');
    var url = iframe.src;
    if (url !== "" + sourceUrl.href) {
      existingModal.remove();
      return _modal3(source);
    }
    existingModal.style.display = 'flex';

    // Ensure the existing modal can receive focus and set focus to it
    if (existingModal) {
      if (!existingModal.hasAttribute('tabindex')) {
        existingModal.setAttribute('tabindex', '-1');
      }
      existingModal.focus();
    }

    // Re-register ESC key handler when showing existing modal
    registerEscKeyHandler();
    // Re-register background click handler when showing existing modal
    registerBackgroundClickHandler();
  } else {
    // Otherwise, create the modal.

    var body = document.body;
    // default height set for UX during load, will be changed via updateParent() from inside iframe content later
    var _iframe = "<iframe scrolling=\"no\" id=\"creditkey-iframe\" src=\"" + sourceUrl.href + "\" style=\"height: 100vh;\"></iframe>";
    if (!validate_url(source)) {
      _iframe = "An invalid resource was requested";
    }
    body.insertAdjacentHTML('beforeend', "<div class=\"creditkey\" id=\"creditkey-modal\" tabindex=\"-1\"><div class=\"ck-modal is-active\"><div class=\"ck-modal-background\"></div><div class=\"ck-modal-content\" id=\"ck-modal-card\">" + _iframe + "</div></div></div>");

    // Set focus to the modal element for accessibility
    var modalElement = document.getElementById('creditkey-modal');
    if (modalElement) {
      modalElement.focus();
    }

    // Register ESC key handler after creating modal
    registerEscKeyHandler();
    // Register background click handler after creating modal
    registerBackgroundClickHandler();
  }
};
function remove(fullRemove) {
  if (fullRemove === void 0) {
    fullRemove = false;
  }
  var el = document.getElementById('creditkey-modal');
  if (el !== null) {
    if (fullRemove) {
      // Completely remove the modal from DOM when explicitly requested
      el.remove();
      // Only remove event handlers when completely removing modal from DOM
      removeEscKeyHandler();
      removeBackgroundClickHandler();
    } else {
      // Hide the modal so we can potentially redisplay it, leaving the user at the same place in the
      // checkout flow, if they accidentally click off.
      el.style.display = 'none';
      // Keep event handlers intact so they work when modal is reshown
    }
  }
}

// ensure that we're requesting a valid creditkey domain
function validate_url(url) {
  if (!url) return false;
  var root = url.split('/')[1];
  if (api('development').split('/')[1] === root) return true;
  if (api('staging').split('/')[1] === root) return true;
  if (api('production').split('/')[1] === root) return true;
  return false;
}
function redirect(uri) {
  if (navigator.userAgent.match(/Android/i)) {
    document.location = uri;
  } else {
    window.location.replace(uri);
  }
}
function registerPostMessageCallback(completionCallback) {
  window.addEventListener('message', function (e) {
    if (!e) return false;
    if (e && !e.data) return false;
    var event;
    try {
      event = JSON.parse(e.data);
    } catch (e) {
      event = false;
    }
    if (!event || !event.action) return false;
    var modal_element = document.getElementById('ck-modal-card');
    var iframe_element = document.getElementById('creditkey-iframe');
    if (!iframe_element || !modal_element) return false;

    // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
    if (event.action === 'cancel' && event.type === 'modal') {
      remove();
    } else if (event.action == 'complete' && event.type == 'modal') {
      if (completionCallback) {
        var params = new URL(event.options);
        completionCallback(params.searchParams.get('id'), remove);
      } else {
        redirect(event.options);
      }
    } else if (event.action == 'height' && event.type == 'modal') {
      var total_height = event.options + 14; // 14 allows padding underneath content (usually legal footer)

      // set the iframe, the parent div, and that div's parent height to something that adjusts to content height
      iframe_element.style.height = total_height.toString() + 'px';

      // Pad parent div height because issues where Chrome's calc'd <body> height is different than other browsers
      //  which cuts of the bottom rounded corners
      if (total_height + 60 > window.innerHeight) {
        modal_element.parentNode.style.height = (total_height + 60).toString() + 'px';
      }

      // force scroll to top because modal starts at top of page.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, false);
}
export default _modal3;