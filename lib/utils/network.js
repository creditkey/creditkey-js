"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _request = _interopRequireDefault(require("./request"));

var _platform = require("./platform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @function Network
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */
var Network = function Network(platform, resource) {
  if (!platform) return false;

  var buildURL = function buildURL(id, resource) {
    var parameters = [(0, _platform.api)(platform)];
    if (resource) parameters = parameters.concat([resource]);
    if (id) parameters = parameters.concat([id]);
    return parameters.join('/');
  }; // Default options used for every request


  var defaultOptions = {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return {
    /**
     * @function post
     * @description Make a POST request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    post: function post(path, body, options) {
      if (options === void 0) {
        options = {};
      }

      return (0, _request["default"])(buildURL(path), _extends({}, options, defaultOptions, {
        method: 'POST',
        body: JSON.stringify(body)
      }));
    },

    /**
     * @function post
     * @description Make a GET request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    get: function get(path, options) {
      if (options === void 0) {
        options = {};
      }

      return (0, _request["default"])(buildURL(path), _extends({}, options, defaultOptions, {
        method: 'GET'
      }));
    },

    /**
     * @function edit
     * @description Make a PUT request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    edit: function edit(path, body, options) {
      if (options === void 0) {
        options = {};
      }

      return (0, _request["default"])(buildURL(path), _extends({}, options, defaultOptions, {
        method: 'PUT',
        body: JSON.stringify(body)
      }));
    },

    /**
     * @function delete
     * @description Make a DELETE request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    "delete": function _delete(path, options) {
      if (options === void 0) {
        options = {};
      }

      return (0, _request["default"])(buildURL(path), _extends({}, options, defaultOptions, {
        method: 'DELETE'
      }));
    },
    ping: function ping() {
      return (0, _request["default"])(buildURL(), {
        method: 'GET'
      });
    }
  };
};

var _default = Network;
exports["default"] = _default;
module.exports = exports.default;