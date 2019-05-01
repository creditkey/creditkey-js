"use strict";

exports.__esModule = true;

var _platform = require("../../utils/platform");

var Text = function Text(key, label) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "checkout";
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = (0, _platform.pdpHost)(_platform.api);

  switch (type) {
    case "checkout":
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
      break;

    case "pdp":
      return "<span class=\"creditkey\"><a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" class=\"is-" + size + " is-fullwidth\" style=\"" + styles + "\">\n          <span class=\"pdp-text is-size-4\">" + label + "</span> <span class=\"is-size-4\" style=\"padding: 0 5px 0 0;\">with</span>\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n        </a>\n      </span>";
      break;

    default:
      return "<span class=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
  }
};

exports.default = Text;
module.exports = exports["default"];