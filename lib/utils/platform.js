'use strict';

exports.__esModule = true;
exports.pdpHost = exports.api = void 0;
var DEV = 'development';
var STAGE = 'staging';
var PROD = 'production';

var api = function api(platform) {
  if (platform === DEV) return 'http://localhost:9100';
  if (platform === STAGE) return 'https://staging.creditkey.com/app';
  if (platform === PROD) return 'https://www.creditkey.com/app';
  return platform; // custom URL - for testing
};

exports.api = api;

var pdpHost = function pdpHost(api) {
  var host = window.location.hostname;

  if (window.location.hostname.indexOf('localhost') >= 0) {
    return api(DEV);
  }

  if (window.location.hostname.indexOf('staging') >= 0 || window.location.hostname.indexOf('dev') >= 0) {
    return api(STAGE);
  }

  switch (host) {
    case 'creditkey.magento2':
      return api(DEV);
      break;

    case 'katom.app':
    case 'packnwood-demo.wjserver960.com':
    case 'magento.creditkey.com':
      return api(STAGE);
      break;

    case 'magento2.creditkey.com':
      return api(PROD);
      break;

    default:
      return api(PROD);
  }
};

exports.pdpHost = pdpHost;