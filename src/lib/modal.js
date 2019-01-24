import { modal_main, modal_background, modal_card, modal_card_mobile, modal_head } from '../styles/modal';
import { api } from '../utils/platform';

const width = window.screen.availWidth;

const modal = source => {
  // Check to see if we've already created the modal - but hidden it when the user clicked off.
  // If so, simply redisplay the modal.
  const existingModal = document.getElementById('creditkey-modal');

  if (existingModal !== null) {
    existingModal.style.display = 'flex';
  } else {
    // Otherwise, create the modal.

    const body = document.body;
    const style = 'margin: auto; width: 100%; border: none; height: 820px;';
    let iframe = `<iframe id="creditkey-iframe" src="${source + '?modal=true'}" style="${style}"></iframe>`;

    if (!validate_url(source)) {
      iframe = `An invalid resource was requested`;
    }

    //body.addEventListener('click', e => remove());
    return body.insertAdjacentHTML('beforeend', `<div id="creditkey-modal" style="${modal_main}"><div style="${modal_background}"></div><div id="modal-card" style="${width <= 479 ? modal_card_mobile : modal_card}">${iframe}</div></div>`);
  }
}

function remove() {
  // Hide the modal so we can potentially redisplay it, leaving the user at the same place in the
  // checkout flow, if they accidentially click off.
  const el = document.getElementById('creditkey-modal');
  if (el !== null) {
    el.style.display = 'none';
  }
}

// ensure that we're requesting a valid creditkey domain
function validate_url(url) {
  if (!url) return false;

  const root = url.split('/')[1];

  if (api('development').split('/')[1] === root) return true;
  if (api('staging').split('/')[1] === root) return true;
  if (api('production').split('/')[1] === root) return true;

  return false;
}

function redirect(uri) {
  if(navigator.userAgent.match(/Android/i)) 
    document.location = uri;      
  else
    window.location.replace(uri);
}

window.addEventListener('message', function(e) {
  if (!e) return false;
  if (e && !e.data) return false;

  let event;

  try {
    event = JSON.parse(e.data);
  } catch (e) {
    event = false;
  }

  if (!event || !event.action) return false;

  let modal_element = document.getElementById('modal-card');

  // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
  if (event.action === 'cancel' && event.type === 'modal') {
    remove();
  } else if (event.action == 'complete' && event.type == 'modal') {
    redirect(event.options);
  } else if (event.action == 'height' && event.type == 'modal') {
    const total_height = 180 + event.options;
    modal_element.style.height = total_height.toString() + 'px';
  }
}, false);

export default modal;
