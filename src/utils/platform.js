'use strict';

const DEV = 'development';
const STAGE = 'staging';
const PROD = 'production';

export const api = platform => {
  if (platform === DEV) return 'http://localhost:9100';
  if (platform === STAGE) return 'https://staging.creditkey.com/app';
  if (platform === PROD) return 'https://www.creditkey.com/app';
  return platform; // custom URL - for testing
}

export const pdpHost = api => {
  const host = window.location.hostname;

  if(window.location.hostname.indexOf('localhost') >= 0) {
    return api(DEV);
  }

  if(window.location.hostname.indexOf('staging') >= 0 || window.location.hostname.indexOf('dev') >= 0) {
    return api(STAGE);
  }

  switch(host) {
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
}
