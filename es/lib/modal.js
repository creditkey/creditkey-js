import '../styles/index.sass';
import { modal, modal_background, modal_card, modal_head } from '../styles/modal';

var Modal = function Modal(source) {
  var body = document.body;
  var style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
  var iframe = '<iframe src="' + (source + '?modal=true') + '" style="' + style + '"></iframe>';

  body.addEventListener('click', function (e) {
    return remove();
  });
  return body.insertAdjacentHTML('beforeend', '<div id="creditkey-modal" style="' + modal + '"><div style="' + modal_background + '"></div><div style="' + modal_card + '">' + iframe + '</div></div>');
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
  }
}, false);

export default Modal;