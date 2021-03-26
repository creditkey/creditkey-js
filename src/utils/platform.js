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

export const applyUI = platform => {
  if (platform === DEV) return 'http://localhost:3001';
  if (platform === STAGE) return 'https://staging-apply.creditkey.com';
  if (platform === PROD) return 'https://apply.creditkey.com';
  return platform; // custom URL - for testing
}

export const marketingUI = platform => {
  if (platform === DEV) return 'http://localhost:3002';
  if (platform === STAGE) return 'https://staging-marketing.creditkey.com';
  if (platform === PROD) return 'https://marketing.creditkey.com';
  return platform; // custom URL - for testing
}

export const pdpHost = (resource, platform) => {
  const host = window.location.hostname;

  if(window.location.hostname.indexOf('localhost') >= 0) {
    return resource(DEV);
  }

  if(window.location.hostname.indexOf('staging') >= 0 || window.location.hostname.indexOf('dev') >= 0) {
    return resource(STAGE);
  }

  if (platform) {
    return resource(platform);
  }

  switch(host) {
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
}
