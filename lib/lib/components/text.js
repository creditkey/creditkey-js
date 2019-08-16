'use strict';

exports.__esModule = true;

var _index = require('../../styles/index.sass');

var _index2 = _interopRequireDefault(_index);

var _platform = require('../../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = (0, _platform.pdpHost)(_platform.api);
  var terms_url = "https://www.creditkey.com/credit-key-lending";
  var btn_url = function btn_url(s) {
    return 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';
  };

  switch (type) {
    case "checkout":
      return '<span class="creditkey">\n          <img src="' + btn_url(size) + '" class="payment-icon" />\n          ' + (size == 'small' ? label.replace('Approval in seconds.', '') : label) + '\n          <a href="' + terms_url + '" class="action action-help" target="_new">See Terms</a>\n        </span>';
      break;

    case "pdp":
      return '<span class="creditkey"><a href="' + host + '/apply/start/' + key + '" target="_new" class="is-fullwidth" style="' + styles + '">\n          <span class="pdp-text">' + label + '</span> <span style="padding: 0 5px 0 0; font-size: 16px !important;">with</span>\n          <img src="' + btn_url(size) + '" class="payment-icon">\n        </a>\n      </span>';
      break;

    default:
      return '<span class="creditkey"><img src="' + btn_url(size) + '">\n          ' + label + '\n          <a href="' + terms_url + '" class="action action-help" target="_new">See Terms</a>\n        </span>';
  }
};

exports.default = Text;
module.exports = exports['default'];