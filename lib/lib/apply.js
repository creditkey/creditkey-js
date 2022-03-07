"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _redirect = _interopRequireDefault(require("./redirect"));

var _platform = require("../utils/platform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var width = window.screen.availWidth;

var apply = function apply(key, type, platform) {
  if (type === void 0) {
    type = 'modal';
  }

  if (platform === void 0) {
    platform = 'production';
  }

  if (!key) {
    throw new Error('API public key required.');
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  }); // always use redirect for small devices

  if (width <= 479) return (0, _redirect["default"])((0, _platform.api)(platform) + '/apply/start/' + key);

  if (type.toLowerCase() === 'modal') {
    return (0, _modal["default"])((0, _platform.api)(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return (0, _redirect["default"])((0, _platform.api)(platform) + '/apply/start/' + key);
  }
};

var _default = apply;
exports["default"] = _default;
module.exports = exports.default;