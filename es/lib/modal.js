import { modal_main, modal_background, modal_card, modal_head } from '../styles/modal';
import { api } from '../utils/platform';

var modal = function modal(source) {
  var body = document.body;
  var style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
  var iframe = '<iframe src="' + (source + '?modal=true') + '" style="' + style + '"></iframe>';

  if (!validate_url(source)) {
    iframe = 'An invalid resource was requested';
  }

  body.addEventListener('click', function (e) {
    return remove();
  });
  return body.insertAdjacentHTML('beforeend', '<div id="creditkey-modal" style="' + modal_main + '"><div style="' + modal_background + '"></div><div id="modal-card" style="' + modal_card + '">' + iframe + '</div></div>');
};

function remove() {
  var el = document.querySelector('#creditkey-modal');
  el && document.body.removeEventListener('click', function (e) {
    return remove;
  });
  el && el.remove();
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

window.addEventListener('message', function (e) {
  event = JSON.parse(e.data);
  var modal_element = document.getElementById('modal-card');

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    window.location.href = event.options;
  } else if (event.action == 'height' && event.type == 'modal') {
    var total_height = 180 + event.options;
    modal_element.style.height = total_height.toString() + 'px';
  }
}, false);

export default modal;