'use strict';

exports.__esModule = true;

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _platform = require('./platform');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  };

  // Default options used for every request
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
    post: function post(path, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return (0, _request2.default)(buildURL(path), (0, _lodash.assign)(options, defaultOptions, {
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
    get: function get(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _request2.default)(buildURL(path), (0, _lodash.assign)(options, defaultOptions, { method: 'GET' }));
    },

    /**
     * @function edit
     * @description Make a PUT request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    edit: function edit(path, body) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return (0, _request2.default)(buildURL(path), (0, _lodash.assign)(options, defaultOptions, {
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
    delete: function _delete(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _request2.default)(buildURL(path), (0, _lodash.assign)(options, defaultOptions, { method: 'DELETE' }));
    },

    ping: function ping() {
      return (0, _request2.default)(buildURL(), { method: 'GET' });
    }
  };
};

exports.default = Network;
module.exports = exports['default'];