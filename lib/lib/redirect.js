"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var redirect = function redirect(source) {
  var uri;
  var isModal = source.indexOf('modal');
  isModal >= 0 ? uri = source.replace('modal', 'redirect') : uri = source;
  if (navigator.userAgent.match(/Android/i)) document.location = uri;else window.location.href = uri;
};
var _default = exports["default"] = redirect;
module.exports = exports.default;