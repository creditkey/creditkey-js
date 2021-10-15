import Client from '../client';
import Charges from '../charges';

export const frame = (url, pointer = true) => {
  let style = '';
  if (!pointer) style = 'pointer-events: none;';
  let iframe = `<div className="iframe-container"><iframe allowtransparency=\"true\" scrolling=\"no\" frameBorder=\"0\" id="creditkey-pdp-iframe" style=\"${style}\" src="${url}"></iframe></div>`;
  return iframe;
}

window.addEventListener('message', function (e) {
  let data;

  if (!e || !e.data) return false;

  try {
    data = JSON.parse(e.data);
  } catch (e) {
    return false;
  }

  if (data.action === 'pdp' && data.options.public_key) {
    const charges = new Charges(data.options.charges ? data.options.charges : '0, 0, 0, 0, 0'.split(','));
    const c = new Client(data.options.public_key, data.options.platform);
    c.enhanced_pdp_modal(charges);
  }
});
