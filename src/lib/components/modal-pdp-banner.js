import Client from '../client';
import Charges from '../charges';

const modalPdpBanner = url => {
  let iframe = `<div className="iframe-container"><iframe id="creditkey-pdp-iframe" src="${url}"></iframe></div>`;
  return iframe;
}

window.addEventListener('message', function (e) {
  if (!e || !e.data) return false;

  const data = JSON.parse(e.data);

  if (data.action === 'pdp' && data.options.public_key) {
    const charges = new Charges(data.options.charges ? data.options.charges : '0, 0, 0, 0, 0'.split(','));
    const c = new Client(data.options.public_key);
    c.enhanced_pdp_modal(charges);
  }
});

export default modalPdpBanner;
