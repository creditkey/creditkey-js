"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _redirect = _interopRequireDefault(require("./redirect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var height = window.screen.availHeight;
var width = window.screen.availWidth;

var checkout = function checkout(source, type) {
  if (type === void 0) {
    type = 'modal';
  }

  if (type.toLowerCase() === 'modal' && width > 480) {
    return (0, _modal["default"])(source);
  } else {
    return (0, _redirect["default"])(source);
  }
};

var _default = checkout;
exports["default"] = _default;
module.exports = exports.default;