'use strict';

exports.__esModule = true;

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkout = function Checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  if (type.toLowerCase() === 'modal') {
    return (0, _modal2.default)(source);
  }
};

exports.default = Checkout;
module.exports = exports['default'];