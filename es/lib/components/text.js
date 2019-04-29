import { api, pdpHost } from '../../utils/platform';

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = pdpHost(api);

  switch (type) {
    case "checkout":
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
      break;

    case "pdp":
      return "<span class=\"creditkey\"><a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" class=\"button is-link is-" + size + " is-fullwidth\" style=\"" + styles + "\">\n          <span class=\"pdp is-size-4\">" + label + "</span> <span class=\"is-size-4\" style=\"padding: 0 5px 0 0;\">with</span>\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg\" /><span class=\"is-size-3 is-uppercase\" style=\"padding: 0 0 0 5px;\">Credit Key</span>\n        </a>\n      </span>";
      break;

    default:
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
  }
};

export default Text;