'use strict';

exports.__esModule = true;

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _redirect = require('./redirect');

var _redirect2 = _interopRequireDefault(_redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var height = window.screen.availHeight;
var width = window.screen.availWidth;

var checkout = function checkout(source) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'modal';

  // always use redirect for small devices
  //if (width <= 479) return redirect(source);

  if (type.toLowerCase() === 'modal') {
    return (0, _modal2.default)(source);
  } else if (type.toLowerCase() === 'redirect') {
    return (0, _redirect2.default)(source);
  }
};

exports.default = checkout;
module.exports = exports['default'];