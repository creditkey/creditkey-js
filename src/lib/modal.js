import '../styles/index.sass';
import { modal, modal_background, modal_card, modal_head } from '../styles/modal';

const Modal = source =>  {
  const body = document.body;
  const style = 'margin: auto; width: 100%; border: none; height: calc(100vh - 160px);';
  const iframe = `<iframe src="${source + '?modal=true'}" style="${style}"></iframe>`;

  body.addEventListener('click', e => remove());
  return body.insertAdjacentHTML('beforeend', `<div id="creditkey-modal" style="${modal}"><div style="${modal_background}"></div><div style="${modal_card}">${iframe}</div></div>`);
}

function remove() {
  const el = document.querySelector('#creditkey-modal');
  el && document.body.removeEventListener('click', e => remove);
  el && el.remove();
}

window.addEventListener('message', function(e) {
  event = JSON.parse(e.data);

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    window.location.href = event.options;
  }
}, false);

export default Modal;
