'use strict';

exports.__esModule = true;

var _index = require('../../styles/index.sass');

var _index2 = _interopRequireDefault(_index);

var _platform = require('../../utils/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(key, label, type) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var slug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var styles = arguments[5];

  var host = (0, _platform.pdpHost)(_platform.api);
  var logo_url = function logo_url(s) {
    return 'https://s3-us-west-2.amazonaws.com/creditkey-assets/sdk/ck-logo-white-' + s + '.svg';
  };

  var buttonClass = void 0;

  switch (size) {
    case 'small':
      buttonClass = "is-small";
      break;
    case 'medium':
      buttonClass = "is-normal";
      break;
    case 'large':
      buttonClass = "is-fullwidth";
      break;
  }

  switch (type) {
    case "checkout":
      return '<span class="creditkey"><a class="button is-link ' + buttonClass + '" style="' + styles + '">\n          <img src="' + logo_url(size) + '" class="ck-logo-' + size + '" />\n          ' + label + '\n        </a>\n        <a href="' + slug + '" class="terms" target="_new">See Terms</a>\n      </span>';
      break;

    case "pdp":
      return '<span class="creditkey"><a href="' + host + '/apply/start/' + key + '" target="_new" class="button is-link ' + buttonClass + '" style="' + styles + '">\n          <span class="pdp">' + label + '</span> <span style="padding: 0 5px 0 0; font-size: 16px !important;">with</span>\n          <img src="' + logo_url(size) + '" class="ck-logo-' + size + ' "/>\n        </a>\n      </span>';
      break;

    default:
      return '<span class="creditkey"><a class="button is-link ' + buttonClass + '" style="' + styles + '">\n          <img src="' + logo_url(size) + '" class="ck-logo-' + size + '" />\n          ' + label + '\n        </a>\n        <a href="' + slug + '" class="terms" target="_new">See Terms</a>\n      </span>';
  }
};

exports.default = Button;
module.exports = exports['default'];