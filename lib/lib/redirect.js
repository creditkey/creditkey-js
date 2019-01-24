'use strict';

exports.__esModule = true;
var redirect = function redirect(source) {
  var uri = void 0;
  var isModal = source.indexOf('modal');
  isModal >= 0 ? uri = source.replace('modal', 'redirect') : uri = source;

  if (navigator.userAgent.match(/Android/i)) document.location = uri;else window.location.href = uri;
};

exports.default = redirect;
module.exports = exports['default'];