/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Eben Goodman
 * Released under the MIT License
 */
'use strict';

var client = require('../client.js');
var charges = require('../charges.js');
var modal = require('./modal.js');

const frame = (url, pointer = true) => {
  registerPostMessageCallback();
  let style = '';
  if (!pointer) style = 'pointer-events: none;';
  let iframe = `<div className="iframe-container"><iframe allowtransparency=\"true\" scrolling=\"no\" id="creditkey-pdp-iframe" frameBorder=\"0\" style=\"${style}\" src="${url}"></iframe></div>`;
  return iframe;
};
function registerPostMessageCallback() {
  window.addEventListener('message', function (e) {
    let data;
    if (!e || !e.data) return false;
    try {
      data = JSON.parse(e.data);
    } catch (e) {
      return false;
    }
    if (data.action === 'pdp' && data.options.public_key) {
      const charges$1 = new charges(data.options.charges ? data.options.charges : '0, 0, 0, 0, 0'.split(','));
      const c = new client(data.options.public_key, data.options.platform);
      c.enhanced_pdp_modal(charges$1);
    } else if (data.action === 'apply' && data.options.public_key) {
      modal(data.options.url);
    }
  });
}

exports.frame = frame;
//# sourceMappingURL=iframes.js.map
