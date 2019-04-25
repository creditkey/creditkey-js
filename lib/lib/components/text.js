"use strict";

exports.__esModule = true;
var Text = function Text(label) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "checkout";
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "medium";
  var styles = arguments[3];

  switch (type) {
    case "checkout":
      return "<span id=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\" class=\"payment-icon\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
      break;

    case "pdp":
      return "<span id=\"creditkey\"><a class=\"is-" + size + " button is-text is-fullwidth\" style=\"" + styles + "\">\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark.svg\">\n          <span class=\"is-size-3 is-uppercase\" style=\"padding: 0 10px 0 5px;\">Credit Key</span>\n          " + label + "\n        </a>\n      </span>";
      break;

    default:
      return "<span id=\"creditkey\"><img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-btn.svg\">\n          " + label + "\n          <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"action action-help\" target=\"_new\">See Terms</a>\n        </span>";
  }
};

exports.default = Text;
module.exports = exports["default"];