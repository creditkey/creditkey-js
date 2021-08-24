"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../client"));

var _charges = _interopRequireDefault(require("../charges"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modalPdpBanner = function modalPdpBanner(url) {
  var iframe = "<div className=\"iframe-container\"><iframe scrolling=\"no\" frameBorder=\"0\" id=\"creditkey-pdp-iframe\" src=\"" + url + "\"></iframe></div>";
  return iframe;
};

window.addEventListener('message', function (e) {
  var data;
  if (!e || !e.data) return false;

  try {
    data = JSON.parse(e.data);
  } catch (e) {
    return false;
  }

  if (data.action === 'pdp' && data.options.public_key) {
    var charges = new _charges["default"](data.options.charges ? data.options.charges : '0, 0, 0, 0, 0'.split(','));
    var c = new _client["default"](data.options.public_key, data.options.platform);
    c.enhanced_pdp_modal(charges);
  }
});
var _default = modalPdpBanner;
exports["default"] = _default;
module.exports = exports.default;