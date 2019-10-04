'use strict';

exports.__esModule = true;

var _index = require('../../styles/index.sass');

var _index2 = _interopRequireDefault(_index);

var _platform = require('../../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    // default height set for UX during load, will be changed via updateParent() from inside iframe content later
    var _iframe = '<iframe id="creditkey-iframe" src="' + (source + '?modal=true') + '" style="height: 100vh;"></iframe>';

    if (!validate_url(source)) {
      _iframe = 'An invalid resource was requested';
    }

    return body.insertAdjacentHTML('beforeend', '<div class="creditkey" id="creditkey-modal"><div class="ck-modal is-active"><div class="ck-modal-background"></div><div class="ck-modal-content" id="ck-modal-card">' + _iframe + '</div></div></div>');
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

  if ((0, _platform.api)('development').split('/')[1] === root) return true;
  if ((0, _platform.api)('staging').split('/')[1] === root) return true;
  if ((0, _platform.api)('production').split('/')[1] === root) return true;

  return false;
}

function redirect(uri) {
  if (navigator.userAgent.match(/Android/i)) {
    document.location = uri;
  } else {
    window.location.replace(uri);
  }
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

  var modal_element = document.getElementById('ck-modal-card');
  var iframe_element = document.getElementById('creditkey-iframe');

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    redirect(event.options);
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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}, false);

exports.default = modal;
module.exports = exports['default'];