"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _modal = _interopRequireDefault(require("./components/modal"));
var _redirect = _interopRequireDefault(require("./redirect"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var checkout = function checkout(source, type, completionCallback) {
  if (type === void 0) {
    type = 'modal';
  }
  var width = window.screen.availWidth;
  if (type.toLowerCase() === 'modal' && width > 480) {
    return (0, _modal["default"])(source, completionCallback);
  } else {
    return (0, _redirect["default"])(source);
  }
};
var _default = exports["default"] = checkout;
module.exports = exports.default;