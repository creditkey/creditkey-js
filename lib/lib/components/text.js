'use strict';

exports.__esModule = true;

var _index = require('../../styles/index.sass');

var _index2 = _interopRequireDefault(_index);

var _platform = require('../../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var slug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var styles = arguments[5];

  var host = (0, _platform.pdpHost)(_platform.api);
  var btn_url = function btn_url(s) {
    return 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-btn-' + s + '.svg';
  };

  switch (type) {
    case "checkout":
      return '<span class="creditkey">\n          <img src="' + btn_url(size) + '" class="payment-icon" />\n          ' + (size == 'small' ? label.replace('Approval in seconds.', '') : label) + '\n          <a href="' + slug + '" class="action action-help terms" target="_new">See Terms</a>\n        </span>';
      break;

    case "pdp":
      return '<span class="creditkey"><a href="' + host + '/apply/start/' + key + '" target="_new" class="is-fullwidth" style="' + styles + '">\n          <span class="pdp-text">' + label + ' with </span><img src="' + btn_url(size) + '" class="payment-icon">\n        </a>\n      </span>';
      break;

    default:
      return '<span class="creditkey"><img src="' + btn_url(size) + '">\n          ' + label + '\n          <a href="' + terms_url + '" class="action action-help terms" target="_new">See Terms</a>\n        </span>';
  }
};

exports.default = Text;
module.exports = exports['default'];