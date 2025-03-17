'use strict';

var DEV = 'development';
var STAGE = 'staging';
var PREVIEW = 'preview';
var PROD = 'production';
export var api = function api(platform) {
  if (platform === DEV) return process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://ck-web.creditkey.localhost';
  if (platform === PREVIEW) return 'https://preview.creditkey.com';
  if (platform === STAGE) return 'https://staging.creditkey.com/app';
  if (platform === PROD) return 'https://www.creditkey.com/app';
  return platform; // custom URL - for testing
};

export var applyUI = function applyUI(platform) {
  if (platform === DEV) return process.env.REACT_APP_APPLY_UI ? process.env.REACT_APP_APPLY_UI : 'http://localhost:3001';
  if (platform === PREVIEW) return 'https://apply.preview.creditkey.com';
  if (platform === STAGE) return 'https://staging-apply.creditkey.com';
  if (platform === PROD) return 'https://apply.creditkey.com';
  return platform; // custom URL - for testing
};

export var marketingUI = function marketingUI(platform) {
  if (platform === DEV) return process.env.REACT_APP_MARKETING_UI ? process.env.REACT_APP_MARKETING_UI : 'http://localhost:3002';
  if (platform === STAGE) return 'https://staging-marketing.creditkey.com';
  if (platform === PREVIEW) return 'https://marketing.preview.creditkey.com';
  if (platform === PROD) return 'https://marketing.creditkey.com';
  return platform; // custom URL - for testing
};

export var pdpHost = function pdpHost(resource, platform) {
  var host = window.location.hostname;
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
      break;
    case 'katom.app':
    case 'packnwood-demo.wjserver960.com':
    case 'magento.creditkey.com':
    case 'demo.creditkey.com':
    case 'demo.creditkey.tech':
      return resource(STAGE);
      break;
    case 'magento2.creditkey.com':
      return resource(PROD);
      break;
    default:
      return resource(PROD);
  }
};