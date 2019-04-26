'use strict';

exports.__esModule = true;

var _modal = require('./components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _redirect = require('./redirect');

var _redirect2 = _interopRequireDefault(_redirect);

var _platform = require('../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = window.screen.availWidth;

var apply = function apply(key) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';
  var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'production';

  if (!key) {
    throw new Error('API public key required.');
  }

  // always use redirect for small devices
  if (width <= 479) return (0, _redirect2.default)(source);

  if (type.toLowerCase() === 'modal') {
    return (0, _modal2.default)((0, _platform.api)(platform) + '/apply/modal/start/' + key);
  } else if (type.toLowerCase() === 'redirect') {
    return (0, _redirect2.default)((0, _platform.api)(platform) + '/apply/start/' + key);
  }
};

exports.default = apply;
module.exports = exports['default'];