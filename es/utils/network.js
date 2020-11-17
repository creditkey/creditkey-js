import request from './request';
import { api } from './platform';
import { assign } from 'lodash';
/**
 * @function Network
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */

var Network = function Network(platform, resource) {
  if (!platform) return false;

  var buildURL = function buildURL(id, resource) {
    var parameters = [api(platform)];
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

      return request(buildURL(path), assign(options, defaultOptions, {
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

      return request(buildURL(path), assign(options, defaultOptions, {
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

      return request(buildURL(path), assign(options, defaultOptions, {
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

      return request(buildURL(path), assign(options, defaultOptions, {
        method: 'DELETE'
      }));
    },
    ping: function ping() {
      return request(buildURL(), {
        method: 'GET'
      });
    }
  };
};

export default Network;