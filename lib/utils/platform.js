/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Credit Key Engineering
 * Released under the MIT License
 */
'use strict';

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

exports.api = api;
exports.marketingUI = marketingUI;
exports.pdpHost = pdpHost;
//# sourceMappingURL=platform.js.map
