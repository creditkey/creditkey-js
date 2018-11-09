'use strict';

exports.__esModule = true;

require('../styles/index.sass');

var _modal = require('../styles/modal');

var Modal = function Modal(source) {
  var body = document.body;
  var style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
  var iframe = '<iframe src="' + (source + '?modal=true') + '" style="' + style + '"></iframe>';

  body.addEventListener('click', function (e) {
    return remove();
  });
  return body.insertAdjacentHTML('beforeend', '<div id="creditkey-modal" style="' + _modal.modal + '"><div style="' + _modal.modal_background + '"></div><div style="' + _modal.modal_card + '">' + iframe + '</div></div>');
};

function remove() {
  var el = document.querySelector('#creditkey-modal');
  el && document.body.removeEventListener('click', function (e) {
    return remove;
  });
  el && el.remove();
}

window.addEventListener('message', function (e) {
  event = JSON.parse(e.data);

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    window.location.href = event.options;
  }
}, false);

exports.default = Modal;
module.exports = exports['default'];