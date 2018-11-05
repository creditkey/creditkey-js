'use strict';

export const api = () => {
  if (platform().dev) return 'http://localhost:3000';
  if (platform().test) return 'http://localhost:3000';
  if (platform().staging) return 'https://staging.creditkey.com';
  if (platform().production) return 'https://www.creditkey.com/app';
}
