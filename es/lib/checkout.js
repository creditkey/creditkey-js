/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Credit Key Engineering
 * Released under the MIT License
 */
import modal from './components/modal.js';
import redirect from './redirect.js';

const checkout = (source, type = 'modal', completionCallback) => {
  let width = window.screen.availWidth;
  if (type.toLowerCase() === 'modal' && width > 480) {
    return modal(source, completionCallback);
  } else {
    return redirect(source);
  }
};

export { checkout as default };
//# sourceMappingURL=checkout.js.map
