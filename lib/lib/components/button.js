"use strict";

exports.__esModule = true;

var _platform = require("../../utils/platform");

var Button = function Button(key, label, type) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "medium";
  var styles = arguments[4];

  var host = (0, _platform.pdpHost)(_platform.api);
  var terms_url = "https://www.creditkey.com/credit-key-lending";
  var logo_url = "https://s3-us-west-2.amazonaws.com/creditkey-assets/ck-logo-white.svg";
  var logo_height = 35;

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
      return "<span class=\"creditkey\"><a class=\"button is-link is-" + size + "\" style=\"" + styles + "\">\n          <img src=\"" + logo_url + "\" class=\"ck-logo-" + size + "\" />\n          <span class=\"is-size-" + font_size + "\">" + label + "</span>\n        </a>\n        <a href=\"" + terms_url + "\" class=\"is-size-5 terms\" target=\"_new\">See Terms</a>\n      </span>";
      break;

    case "pdp":
      return "<span class=\"creditkey\"><a href=\"" + host + "/apply/start/" + key + "\" target=\"_new\" class=\"button is-link is-" + size + " is-fullwidth\" style=\"" + styles + "\">\n          <span class=\"pdp is-size-" + font_size + "\">" + label + "</span> <span class=\"is-size-" + font_size + "\" style=\"padding: 0 5px 0 0;\">with</span>\n          <img src=\"" + logo_url + "\" class=\"ck-logo-" + size + "\" />\n        </a>\n      </span>";
      break;

    default:
      return "<span class=\"creditkey\"><a class=\"button is-link is-" + size + "\" style=\"" + styles + "\">\n          <img src=\"" + logo_url + "\" class=\"ck-logo-" + size + "\" />\n          <span class=\"is-size-" + font_size + "\">" + label + "</span>\n        </a>\n        <a href=\"" + terms_url + "\" class=\"is-size-5 terms\" target=\"_new\">See Terms</a>\n      </span>";
  }
};

exports.default = Button;
module.exports = exports["default"];