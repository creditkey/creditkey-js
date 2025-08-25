"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _index = _interopRequireDefault(require("../../styles/index.css"));
var _platform = require("../../utils/platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _modal = function modal(source, completionCallback) {
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
      return _modal(source);
    }
    existingModal.style.display = 'flex';
  } else {
    // Otherwise, create the modal.

    var body = document.body;
    // default height set for UX during load, will be changed via updateParent() from inside iframe content later
    var _iframe = "<iframe scrolling=\"no\" id=\"creditkey-iframe\" src=\"" + sourceUrl.href + "\" style=\"height: 100vh;\"></iframe>";
    if (!validate_url(source)) {
      _iframe = "An invalid resource was requested";
    }
    return body.insertAdjacentHTML('beforeend', "<div class=\"creditkey\" id=\"creditkey-modal\"><div class=\"ck-modal is-active\"><div class=\"ck-modal-background\"></div><div class=\"ck-modal-content\" id=\"ck-modal-card\">" + _iframe + "</div></div></div>");
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
var _default = exports["default"] = _modal;
module.exports = exports.default;