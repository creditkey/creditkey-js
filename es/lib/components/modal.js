import { api } from '../../utils/platform';

var modal = function modal(source) {
  // Check to see if we've already created the modal - but hidden it when the user clicked off.
  // If so, simply redisplay the modal.
  var existingModal = document.getElementById('creditkey-modal');

  if (existingModal !== null) {
    var iframe = document.getElementById('creditkey-iframe');
    var url = iframe.src;
    if (url !== source + '?modal=true') {
      existingModal.remove();
      return modal(source);
    }
    existingModal.style.display = 'flex';
  } else {
    // Otherwise, create the modal.

    var body = document.body;
    var _iframe = '<iframe id="creditkey-iframe" src="' + (source + '?modal=true') + '"></iframe>';

    if (!validate_url(source)) {
      _iframe = 'An invalid resource was requested';
    }

    return body.insertAdjacentHTML('beforeend', '<div class="creditkey" id="creditkey-modal"><div class="modal is-active"><div class="modal-background"></div><div class="modal-content" id="modal-card">' + _iframe + '</div></div></div>');
  }
};

function remove() {
  // Hide the modal so we can potentially redisplay it, leaving the user at the same place in the
  // checkout flow, if they accidentially click off.
  var el = document.getElementById('creditkey-modal');
  if (el !== null) {
    el.style.display = 'none';
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
  if (navigator.userAgent.match(/Android/i)) document.location = uri;else window.location.replace(uri);
}

window.addEventListener('message', function (e) {
  if (!e) return false;
  if (e && !e.data) return false;

  var event = void 0;

  try {
    event = JSON.parse(e.data);
  } catch (e) {
    event = false;
  }

  if (!event || !event.action) return false;

  var modal_element = document.getElementById('modal-card');
  var iframe_element = document.getElementById('creditkey-iframe');

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    redirect(event.options);
  } else if (event.action == 'height' && event.type == 'modal') {
    var total_height = event.options + 50;

    // set the iframe, the parent div, and that div's parent height to something that adjusts to content height
    iframe_element.style.height = total_height.toString() + 'px';
    modal_element.parentNode.style.height = total_height.toString() + 'px';
  }
}, false);

export default modal;