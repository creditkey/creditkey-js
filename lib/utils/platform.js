'use strict';

exports.__esModule = true;
exports.pdpHost = exports.marketingUI = exports.applyUI = exports.api = void 0;
var DEV = 'development';
var STAGE = 'staging';
var PROD = 'production';

var api = function api(platform) {
  if (platform === DEV) return process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:9100';
  if (platform === STAGE) return 'https://staging.creditkey.com/app';
  if (platform === PROD) return 'https://www.creditkey.com/app';
  return platform; // custom URL - for testing
};

exports.api = api;

var applyUI = function applyUI(platform) {
  if (platform === DEV) return process.env.REACT_APP_APPLY_UI ? process.env.REACT_APP_APPLY_UI : 'http://apply.localhost:3001';
  if (platform === STAGE) return 'https://staging-apply.creditkey.com';
  if (platform === PROD) return 'https://apply.creditkey.com';
  return platform; // custom URL - for testing
};

exports.applyUI = applyUI;

var marketingUI = function marketingUI(platform) {
  if (platform === DEV) return process.env.REACT_APP_MARKETING_UI ? process.env.REACT_APP_MARKETING_UI : 'http://localhost:3002';
  if (platform === STAGE) return 'https://staging-marketing.creditkey.com';
  if (platform === PROD) return 'https://marketing.creditkey.com';
  return platform; // custom URL - for testing
};

exports.marketingUI = marketingUI;

var pdpHost = function pdpHost(resource, platform) {
  var host = window.location.hostname;

  if (platform) {
    return resource(platform);
  }

  if (window.location.hostname.indexOf('staging') >= 0 || window.location.hostname.indexOf('dev') >= 0) {
    return resource(STAGE);
  }

  if (window.location.hostname.indexOf('localhost') >= 0) {
    return resource(DEV);
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

exports.pdpHost = pdpHost;