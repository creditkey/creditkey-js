'use strict';

exports.__esModule = true;
exports.default = undefined;

var _network = require('../utils/network');

var _network2 = _interopRequireDefault(_network);

var _platform = require('../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var client = function () {
  function client(key) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'production';

    _classCallCheck(this, client);

    this.key = key;
    this.platform = platform;
    this.network = (0, _network2.default)((0, _platform.api)(platform));
  }

  client.prototype.is_displayed_in_checkout = function is_displayed_in_checkout() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.network.post('ecomm/is_displayed_in_checkout', {
        public_key: _this.key
      }).then(function (res) {
        return console.log(res);
      });
    });
  };

  return client;
}();

exports.default = client;
module.exports = exports['default'];