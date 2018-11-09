function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Network from '../utils/network';
import { api } from '../utils/platform';

var client = function () {
  function client(key) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'production';

    _classCallCheck(this, client);

    this.key = key;
    this.platform = platform;
    this.network = Network(api(platform));
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

export { client as default };