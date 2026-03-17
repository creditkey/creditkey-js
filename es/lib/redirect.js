/*!
 * @credit-key/creditkey-js v1.3.1
 * (c) 2026 Credit Key Engineering
 * Released under the MIT License
 */
const redirect = source => {
  let uri;
  const isModal = source.indexOf('modal');
  isModal >= 0 ? uri = source.replace('modal', 'redirect') : uri = source;
  if (navigator.userAgent.match(/Android/i)) document.location = uri;else window.location.href = uri;
};

export { redirect as default };
//# sourceMappingURL=redirect.js.map
