/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Eben Goodman
 * Released under the MIT License
 */
'use strict';

var modal = require('./components/modal.js');
var redirect = require('./redirect.js');
var platform = require('../utils/platform.js');

const apply = (key, type = 'modal', platform$1 = 'production') => {
  if (!key) {
    throw new Error('API public key required.');
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  if (type.toLowerCase() === 'modal') {
    return modal(platform.api(platform$1) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return redirect(platform.api(platform$1) + '/apply/start/' + key);
  }
};

module.exports = apply;
//# sourceMappingURL=apply.js.map
