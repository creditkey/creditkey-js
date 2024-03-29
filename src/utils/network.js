import request from './request';
import { api } from './platform';

/**
 * @function Network
 * @description Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} resource The resource used for config
 */
const Network = (platform, resource) => {
  if (!platform) return false;

  let buildURL = (id, resource) => {
    let parameters = [api(platform)];

    if (resource) parameters = parameters.concat([resource]);
    if (id) parameters = parameters.concat([id]);

    return parameters.join('/');
  }

  // Default options used for every request
  const defaultOptions = {
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
    post: (path, body, options = {}) => {
      return request(buildURL(path), {
        ...options,
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(body)
      });
    },

    /**
     * @function post
     * @description Make a GET request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    get: (path, options = {}) => {
      return request(buildURL(path), {
        ...options,
        ...defaultOptions,
        method: 'GET'
      });
    },

    /**
     * @function edit
     * @description Make a PUT request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    edit: (path, body, options = {}) => {
      return request(buildURL(path), {
        ...options,
        ...defaultOptions,
        method: 'PUT',
        body: JSON.stringify(body)
      });
    },

    /**
     * @function delete
     * @description Make a DELETE request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    delete: (path, options = {}) => {
      return request(buildURL(path), {
        ...options,
        ...defaultOptions,
        method: 'DELETE'
      });
    },

    ping: () => request(buildURL(), { method: 'GET' })
  };
};

export default Network;
