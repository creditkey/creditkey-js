'use strict';

exports.__esModule = true;
var api = exports.api = function api(platform) {
  if (platform === 'development') return 'http://localhost:9100/';
  if (platform === 'staging') return 'https://staging.creditkey.com/app/';
  if (platform === 'production') return 'https://www.creditkey.com/app/';
};