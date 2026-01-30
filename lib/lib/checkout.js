/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Eben Goodman
 * Released under the MIT License
 */
'use strict';

var modal = require('./components/modal.js');
var redirect = require('./redirect.js');

const checkout = (source, type = 'modal', completionCallback) => {
  let width = window.screen.availWidth;
  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source, completionCallback);
  } else {
    return redirect(source);
  }
};

module.exports = checkout;
//# sourceMappingURL=checkout.js.map
