import { api, pdpHost } from '../../utils/platform';

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = pdpHost(api);

  var font_size = void 0;

  switch (size) {
    case 'small':
      font_size = 5;
      break;
    case 'large':
      font_size = 2;
      break;
    default:
      font_size = 4;
  }

  switch (type) {
    case "checkout":
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n          <span class=\"is-size-" + font_size + "\">" + label + "</span>\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help is-size-" + font_size + "\" target=\"_new\">See Terms</a>\n        </span>";
      break;

    case "pdp":
      return "<span class=\"creditkey\"><a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" class=\"is-" + size + " is-fullwidth\" style=\"" + styles + "\">\n          <span class=\"pdp-text is-size-" + font_size + "\">" + label + "</span> <span class=\"is-size-" + font_size + "\" style=\"padding: 0 5px 0 0;\">with</span>\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n        </a>\n      </span>";
      break;

    default:
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\">\n          <span class=\"is-size-" + font_size + "\">" + label + "</span>\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help is-size-" + font_size + "\" target=\"_new\">See Terms</a>\n        </span>";
  }
};

export default Text;