'use strict';

export const api = platform => {
  if (platform === 'development') return 'http://localhost:9100/';
  if (platform === 'staging') return 'https://staging.creditkey.com/app/';
  if (platform === 'production') return 'https://www.creditkey.com/app/';
}
