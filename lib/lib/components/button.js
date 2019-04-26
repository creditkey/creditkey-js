"use strict";

exports.__esModule = true;
var Button = function Button(label, type) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "medium";
  var styles = arguments[3];

  switch (type) {
    case "checkout":
      return "<span id=\"creditkey\"><a class=\"button is-link is-" + size + "\" style=\"" + styles + "\">\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg\">\n          <span class=\"is-size-3 is-uppercase\" style=\"padding: 0 10px 0 5px;\">Credit Key</span>\n          " + label + "\n        </a>\n        <a href=\"https://www.creditkey.com/credit-key-lending\" class=\"is-size-5 terms\" target=\"_new\">See Terms</a>\n      </span>";
      break;

    case "pdp":
      return "<span id=\"creditkey\"><a class=\"button is-link is-" + size + " is-fullwidth\" style=\"" + styles + "\">\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg\">\n          <span class=\"is-size-3 is-uppercase\" style=\"padding: 0 10px 0 5px;\">Credit Key</span>\n          " + label + "\n        </a>\n      </span>";
      break;

    default:
      return "<span id=\"creditkey\"><a class=\"button is-link is-" + size + "\" style=\"" + styles + "\">\n          <img src=\"https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-mark-white.svg\">\n          <span class=\"is-size-3 is-uppercase\" style=\"padding: 0 10px 0 5px;\">Credit Key</span>\n          " + label + "\n        </a>\n      </span>";
  }
};

exports.default = Button;
module.exports = exports["default"];