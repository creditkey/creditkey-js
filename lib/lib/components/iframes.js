"use strict";

exports.__esModule = true;
exports.frame = void 0;
var _client = _interopRequireDefault(require("../client"));
var _charges = _interopRequireDefault(require("../charges"));
var _modal = _interopRequireDefault(require("./modal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var frame = function frame(url, pointer) {
  if (pointer === void 0) {
    pointer = true;
  }
  registerPostMessageCallback();
  var style = '';
  if (!pointer) style = 'pointer-events: none;';
  var iframe = "<div className=\"iframe-container\"><iframe allowtransparency=\"true\" scrolling=\"no\" id=\"creditkey-pdp-iframe\" frameBorder=\"0\" style=\"" + style + "\" src=\"" + url + "\"></iframe></div>";
  return iframe;
};
exports.frame = frame;
function registerPostMessageCallback() {
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
    } else if (data.action === 'apply' && data.options.public_key) {
      (0, _modal["default"])(data.options.url);
    }
  });
}