/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Credit Key Engineering
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ck = factory());
})(this, (function () { 'use strict';

  /**
   * @private
   * @function request
   * @description Make a request to the server and return a promise.
   * @param {string} url
   * @param {object} options
   * @returns {promise}
   */
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  function request(url, options) {
    return new Promise((resolve, reject) => {
      if (!url) reject(new Error('URL parameter required'));
      if (!options) reject(new Error('Options parameter required'));
      fetch(url, options).then(response => handleErrors(response)).then(response => response.json()).then(response => {
        if (response.errors) reject(response.errors);else resolve(response);
      }).catch(err => reject(err));
    });
  }

  const DEV = 'development';
  const STAGE = 'staging';
  const PREVIEW = 'preview';
  const PROD = 'production';
  const api = platform => {
    if (platform === DEV) return process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://ck-web.creditkey.localhost';
    if (platform === PREVIEW) return 'https://preview.creditkey.com';
    if (platform === STAGE) return 'https://staging.creditkey.com/app';
    if (platform === PROD) return 'https://www.creditkey.com/app';
    return platform; // custom URL - for testing
  };
  const marketingUI = platform => {
    if (platform === DEV) return process.env.REACT_APP_MARKETING_UI ? process.env.REACT_APP_MARKETING_UI : 'http://localhost:3002';
    if (platform === STAGE) return 'https://staging-marketing.creditkey.com';
    if (platform === PREVIEW) return 'https://marketing.preview.creditkey.com';
    if (platform === PROD) return 'https://marketing.creditkey.com';
    return platform; // custom URL - for testing
  };
  const pdpHost = (resource, platform) => {
    const host = window.location.hostname;
    if (host.indexOf('staging') >= 0 || host.indexOf('dev') >= 0) {
      return resource(STAGE);
    }
    if (host.indexOf('preview') >= 0 || host.indexOf('dev') >= 0) {
      return resource(PREVIEW);
    }
    if (host.indexOf('localhost') >= 0) {
      return resource(DEV);
    }
    if (platform) {
      return resource(platform);
    }
    switch (host) {
      case 'creditkey.magento2':
        return resource(DEV);
      case 'katom.app':
      case 'packnwood-demo.wjserver960.com':
      case 'magento.creditkey.com':
      case 'demo.creditkey.com':
      case 'demo.creditkey.tech':
        return resource(STAGE);
      case 'magento2.creditkey.com':
        return resource(PROD);
      default:
        return resource(PROD);
    }
  };

  /**
   * @function Network
   * @description Factory function to create a object that can send
   * requests to a specific resource on the server.
   * @param {string} resource The resource used for config
   */
  const Network = (platform, resource) => {
    if (!platform) return false;
    let buildURL = (id, resource) => {
      let parameters = [api(platform)];
      if (id) parameters = parameters.concat([id]);
      return parameters.join('/');
    };

    // Default options used for every request
    const defaultOptions = {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return {
      /**
       * @function post
       * @description Make a POST request.
       * @param {string} path
       * @param {object} body
       * @param {object} options
       * @returns {promise}
       */
      post: (path, body, options = {}) => {
        return request(buildURL(path), {
          ...options,
          ...defaultOptions,
          method: 'POST',
          body: JSON.stringify(body)
        });
      },
      /**
       * @function post
       * @description Make a GET request.
       * @param {string} path
       * @param {object} options
       * @returns {promise}
       */
      get: (path, options = {}) => {
        return request(buildURL(path), {
          ...options,
          ...defaultOptions,
          method: 'GET'
        });
      },
      /**
       * @function edit
       * @description Make a PUT request.
       * @param {string} path
       * @param {object} body
       * @param {object} options
       * @returns {promise}
       */
      edit: (path, body, options = {}) => {
        return request(buildURL(path), {
          ...options,
          ...defaultOptions,
          method: 'PUT',
          body: JSON.stringify(body)
        });
      },
      /**
       * @function delete
       * @description Make a DELETE request.
       * @param {string} path
       * @param {object} options
       * @returns {promise}
       */
      delete: (path, options = {}) => {
        return request(buildURL(path), {
          ...options,
          ...defaultOptions,
          method: 'DELETE'
        });
      },
      ping: () => request(buildURL(), {
        method: 'GET'
      })
    };
  };

  var css_248z = ".creditkey{all:initial}.creditkey *{all:unset}.creditkey{font-family:Proxima Nova,Helvetica Neue,Helvetica,Arial,sans-serif;z-index:50000}.creditkey,.creditkey .button,.creditkey a{text-decoration:none!important}.creditkey .button{background-color:#3d9ce5!important;border-width:0!important;min-height:40px!important;vertical-align:middle!important}.creditkey .ck-modal{align-items:flex-start;background:transparent!important;bottom:0;display:flex;justify-content:normal;left:0;margin:0!important;max-width:100%!important;overflow:hidden;padding-top:50px;position:absolute;right:0;top:0;visibility:visible!important;width:100%!important;z-index:50001}@media screen and (max-device-width:480px){.creditkey .ck-modal{padding-top:0!important}}.creditkey .ck-modal-background{background-color:hsla(0,0%,4%,.86);bottom:0;left:0;position:fixed;right:0;top:0}.creditkey .ck-modal-card,.creditkey .ck-modal-content{height:auto!important;margin:0 20px;max-height:none;max-height:calc(100vh - 160px);min-height:min-content!important;overflow:auto;position:relative;width:100%}@media screen and (min-width:769px){.creditkey .ck-modal-card,.creditkey .ck-modal-content{height:auto!important;margin:0 auto;max-height:none;max-height:calc(100vh - 40px);min-height:min-content!important;width:650px}}.creditkey .ck-modal-card{max-height:none!important;min-height:min-content!important}.creditkey .ck-modal-content{-webkit-overflow-scrolling:touch;background-color:#fff;background-image:url(https://www.creditkey.com/app/assets/header/ck-nav-logo-d79f74bc03213d02a5ab4cd1c484cfcfb533c2abf5f05ee35cd67c5239693a28.svg);background-position:50%;background-repeat:no-repeat;border-radius:5px;height:auto;max-height:none;min-height:min-content;overflow:hidden}@media screen and (max-width:768px){.creditkey .ck-modal-content{border-radius:0!important;height:100%}}.creditkey #creditkey-iframe{border:none;height:inherit;margin:auto;width:100%}.creditkey .payment-icon{display:inline-block!important;margin-right:5px!important;vertical-align:middle!important}.creditkey .terms{color:#3d9ce5;cursor:pointer;text-decoration:underline}.creditkey .terms:hover{text-decoration:none}.creditkey .pdp{font-size:16px!important;font-weight:700;padding:0 5px 0 0}.creditkey .pdp-text{font-size:16px!important;font-weight:400}.creditkey .ck-offer{float:right;text-align:left}.creditkey .ck-logo-large,.creditkey .ck-logo-medium,.creditkey .ck-logo-small{height:22px!important}#creditkey-pdp-iframe{max-height:70px!important;width:100%!important}";
  (function() {
    if (typeof document === 'undefined') return;
    var css = css_248z;
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  })();

  const modal = (source, completionCallback) => {
    registerPostMessageCallback$1(completionCallback);

    // Check to see if we've already created the modal - but hidden it when the user clicked off.
    // If so, simply redisplay the modal.
    const existingModal = document.getElementById('creditkey-modal');
    const sourceUrl = new URL(source);
    sourceUrl.searchParams.append('modal', true);
    if (existingModal !== null) {
      let iframe = document.getElementById('creditkey-iframe');
      let url = iframe.src;
      if (url !== `${sourceUrl.href}`) {
        existingModal.remove();
        return modal(source);
      }
      existingModal.style.display = 'flex';
      // Remove old event listeners before re-adding when showing existing modal
      removeModalEventListeners();
      addModalEventListeners();
    } else {
      // Otherwise, create the modal.

      const body = document.body;
      // default height set for UX during load, will be changed via updateParent() from inside iframe content later
      let iframe = `<iframe scrolling="no" id="creditkey-iframe" src="${sourceUrl.href}" style="height: 100vh;"></iframe>`;
      if (!validate_url(source)) {
        iframe = `An invalid resource was requested`;
      }
      body.insertAdjacentHTML('beforeend', `<div class="creditkey" id="creditkey-modal"><div class="ck-modal is-active"><div class="ck-modal-background"></div><div class="ck-modal-content" id="ck-modal-card">${iframe}</div></div></div>`);

      // Add event listeners for ESC key and background click
      addModalEventListeners();
    }
  };
  function remove() {
    // Hide the modal so we can potentially redisplay it, leaving the user at the same place in the
    // checkout flow, if they accidentially click off.
    const el = document.getElementById('creditkey-modal');
    if (el !== null) {
      el.style.display = 'none';
      // Remove event listeners when hiding modal
      removeModalEventListeners();
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
  function redirect$1(uri) {
    if (navigator.userAgent.match(/Android/i)) {
      document.location = uri;
    } else {
      window.location.replace(uri);
    }
  }
  function registerPostMessageCallback$1(completionCallback) {
    window.addEventListener('message', function (e) {
      if (!e) return false;
      if (e && !e.data) return false;
      let event;
      try {
        event = JSON.parse(e.data);
      } catch (e) {
        event = false;
      }
      if (!event || !event.action) return false;
      let modal_element = document.getElementById('ck-modal-card');
      let iframe_element = document.getElementById('creditkey-iframe');
      if (!iframe_element || !modal_element) return false;

      // if we're closing the modal from within the CK iframe, trigger the event bound to parent body
      if (event.action === 'cancel' && event.type === 'modal') {
        remove();
      } else if (event.action == 'complete' && event.type == 'modal') {
        if (completionCallback) {
          const params = new URL(event.options);
          completionCallback(params.searchParams.get('id'), remove);
        } else {
          redirect$1(event.options);
        }
      } else if (event.action == 'height' && event.type == 'modal') {
        const total_height = event.options + 14; // 14 allows padding underneath content (usually legal footer)

        // set the iframe, the parent div, and that div's parent height to something that adjusts to content height
        iframe_element.style.height = total_height.toString() + 'px';

        // Pad parent div height because issues where Chrome's calc'd <body> height is different than other browsers
        //  which cuts of the bottom rounded corners
        if (total_height + 60 > window.innerHeight) {
          modal_element.parentNode.style.height = (total_height + 60).toString() + 'px';
        }

        // force scroll to top because modal starts at top of page.
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }, false);
  }

  // Event handlers for ESC key and background click
  let escKeyHandler;
  let backgroundClickHandler;
  function addModalEventListeners() {
    // ESC key handler
    escKeyHandler = function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        const modal = document.getElementById('creditkey-modal');
        if (modal && modal.style.display !== 'none') {
          remove();
        }
      }
    };

    // Background click handler
    backgroundClickHandler = function (e) {
      const modal = document.getElementById('creditkey-modal');
      if (modal && modal.style.display !== 'none') {
        // Check if click target is the modal background (not the content)
        if (e.target.classList.contains('ck-modal-background')) {
          remove();
        }
      }
    };

    // Add event listeners
    document.addEventListener('keydown', escKeyHandler);
    document.addEventListener('click', backgroundClickHandler);
  }
  function removeModalEventListeners() {
    if (escKeyHandler) {
      document.removeEventListener('keydown', escKeyHandler);
      escKeyHandler = null;
    }
    if (backgroundClickHandler) {
      document.removeEventListener('click', backgroundClickHandler);
      backgroundClickHandler = null;
    }
  }

  class Charges {
    constructor(total, shipping, tax, discount_amount, grand_total) {
      this.data = {
        total: total,
        shipping: shipping,
        tax: tax,
        discount_amount: discount_amount,
        grand_total: grand_total
      };
    }
    validate_charges() {
      if (this.data.shipping && !this.is_valid_money_value(this.data.shipping)) return false;
      if (this.data.tax && !this.is_valid_money_value(this.data.tax)) return false;
      if (this.data.discount_amount && !this.is_valid_money_value(this.data.discount_amount)) return false;
      if (!this.is_valid_money_value(this.data.total) || !this.is_valid_money_value(this.data.grand_total)) {
        return false;
      }
      return true;
    }
    is_valid_money_value(value) {
      const num = +value;
      if (isNaN(num)) return false;
      return true;
    }
  }

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
        const charges = new Charges(data.options.charges ? data.options.charges : '0, 0, 0, 0, 0'.split(','));
        const c = new Client(data.options.public_key, data.options.platform);
        c.enhanced_pdp_modal(charges);
      } else if (data.action === 'apply' && data.options.public_key) {
        modal(data.options.url);
      }
    });
  }

  class Client {
    constructor(key, platform = 'development') {
      this.key = key;
      this.platform = platform;
      this.network = Network(platform);
    }
    get key_param() {
      return '?public_key=' + this.key;
    }
    begin_checkout(cartItems, billingAddress, shippingAddress, charges, remoteId, customerId, returnUrl, cancelUrl, orderCompleteUrl, mode, merchant_data) {
      return new Promise((resolve, reject) => {
        if (!cartItems || !billingAddress || !charges || !customerId || !returnUrl || !cancelUrl) {
          return reject('missing required data');
        }
        if (!Array.isArray(cartItems)) {
          return reject('cart items must be an array of CartItem objects');
        } else if (cartItems.filter(c => !c.is_valid_item()).length >= 1) {
          return reject('one or more cart items are invalid');
        }
        if (typeof billingAddress !== 'object') {
          return reject('billing address should be an Address object');
        }
        if (typeof charges !== 'object') {
          return reject('charges should be a Charges object');
        } else if (!charges.validate_charges()) {
          return reject('charges value is invalid');
        }
        return this.network.post('ecomm/begin_checkout' + this.key_param, {
          cart_items: cartItems.map(item => item.data),
          shipping_address: shippingAddress && shippingAddress.data,
          billing_address: billingAddress.data,
          charges: charges.data,
          remote_id: remoteId,
          remote_customer_id: customerId,
          return_url: returnUrl,
          cancel_url: cancelUrl,
          order_complete_url: orderCompleteUrl,
          mode: mode || 'modal',
          merchant_data
        }).then(res => resolve(res)).catch(err => reject(err));
      });
    }
    is_displayed_in_checkout(cartItems) {
      return new Promise((resolve, reject) => {
        if (!Array.isArray(cartItems)) {
          return reject('cart items must be an array of CartItem objects');
        } else if (cartItems.filter(c => !c.is_valid_item()).length >= 1) {
          return reject('one or more cart items are invalid');
        }
        return this.network.post('ecomm/is_displayed_in_checkout' + this.key_param, {
          cart_items: cartItems.map(item => item.data)
        }).then(res => res['is_displayed_in_checkout'] ? resolve(true) : reject(false)).catch(err => reject(err));
      });
    }

    // display options are button, text, button_text
    // size options are small, medium, large, special (special loads a special version of the plain logo, instead of a sized badge version)
    // extra options can be:
    // 'special' = renders a special text only version of the pdp
    // 'static' = renders an unlinked version pf the pdp, basically a dumb banner
    // extra is ignored when 'none' or called with type checkout
    get_marketing_display(charges, type = "checkout", display = "button", size = "medium", extra = "none") {
      return new Promise((resolve, reject) => resolve(this.get_checkout_display(charges)));
    }
    enhanced_pdp_modal(charges, type = 'pdp') {
      if (charges && typeof charges !== 'object') {
        return reject('charges should be a charges object');
      }
      const allowedTypes = ['pdp', 'cart'];
      if (!allowedTypes.includes(type)) return reject('invalid type, allowed types are "pdp", "cart"');
      const url = pdpHost(marketingUI, this.platform) + '/pdp/' + this.key + '/' + type + '/' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
      return modal(url);
    }
    get_apply_now(type, charges) {
      const url = pdpHost(marketingUI, this.platform) + '/apply.html?public_key=' + this.key + '&type=' + type + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
      return frame(url);
    }
    get_checkout_display(charges) {
      if (charges && typeof charges !== 'object') {
        return reject('charges should be a charges object');
      }
      const url = pdpHost(marketingUI, this.platform) + '/checkout.html?public_key=' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
      return frame(url, false);
    }

    // charges is a charges object
    get_pdp_display(charges) {
      let view = 'pdp';
      const url = pdpHost(marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
      return frame(url);
    }
    get_cart_display(charges, desktop, mobile) {
      let view = 'cart';
      if (desktop === void 0) {
        desktop = "right";
      }
      if (mobile === void 0) {
        mobile = "left";
      }
      const url = pdpHost(marketingUI, this.platform) + '/' + view + '.html?public_key=' + this.key + '&desktop=' + desktop + '&mobile=' + mobile + '&charges=' + [charges.data.total, charges.data.shipping, charges.data.tax, charges.data.discount_amount, charges.data.grand_total].join(',');
      return frame(url);
    }
    get_customer(email, customer_id) {
      if (!email || !customer_id) {
        return Promise.reject('Missing required paramters');
      }
      if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(email)) {
        return Promise.reject('Invalid email address');
      }
      return this.network.post('ecomm/customer' + this.key_param, {
        email: email,
        customer_id: customer_id
      });
    }
  }

  class CartItem {
    constructor(merchantProductId, name, price, sku, quantity, size, color) {
      this.data = {
        merchant_id: merchantProductId,
        name: name,
        price: price,
        sku: sku,
        quantity: quantity,
        size: size,
        color: color
      };
    }
    is_valid_item() {
      return !!(this.data.merchant_id && this.data.name);
    }
  }

  class Address {
    constructor(first_name, last_name, company_name, email, address1, address2, city, state, zip, phone_number) {
      this.data = {
        first_name: first_name,
        last_name: last_name,
        company_name: company_name,
        email: email,
        address1: address1,
        address2: address2 || '',
        city: city,
        state: state,
        zip: zip,
        phone_number: phone_number || ''
      };
    }
    is_valid_address() {
      for (var p in this.data) {
        if ((!this.data[p] || this.data[p] === '') && p !== 'address2') {
          return false;
        }
      }
      return true;
    }
  }

  const redirect = source => {
    let uri;
    const isModal = source.indexOf('modal');
    isModal >= 0 ? uri = source.replace('modal', 'redirect') : uri = source;
    if (navigator.userAgent.match(/Android/i)) document.location = uri;else window.location.href = uri;
  };

  const checkout = (source, type = 'modal', completionCallback) => {
    let width = window.screen.availWidth;
    if (type.toLowerCase() === 'modal' && width > 480) {
      return modal(source, completionCallback);
    } else {
      return redirect(source);
    }
  };

  const apply = (key, type = 'modal', platform = 'production') => {
    if (!key) {
      throw new Error('API public key required.');
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (type.toLowerCase() === 'modal') {
      return modal(api(platform) + '/apply/modal/start/' + key);
    } else if (type.toLowerCase() === 'redirect') {
      return redirect(api(platform) + '/apply/start/' + key);
    }
  };

  var index = {
    Client,
    CartItem,
    Address,
    Charges,
    apply,
    checkout
  };

  return index;

}));
//# sourceMappingURL=creditkey-js.js.map
