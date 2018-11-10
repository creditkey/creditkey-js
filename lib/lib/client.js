'use strict';

exports.__esModule = true;
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _network = require('../utils/network');

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var client = function () {
  function client(key) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'development';

    _classCallCheck(this, client);

    this.key = key;
    this.network = (0, _network2.default)(platform);
  }

  client.prototype.is_displayed_in_checkout = function is_displayed_in_checkout() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.network.post('ecomm/is_displayed_in_checkout' + _this.key_param).then(function (res) {
        return res['is_displayed_in_checkout'];
      });
    });
  };

  _createClass(client, [{
    key: 'key_param',
    get: function get() {
      return '?public_key=' + this.key;
    }
  }]);

  return client;
}();

exports.default = client;
module.exports = exports['default'];