'use strict';

exports.__esModule = true;
exports.default = request;
/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function request(url, options) {
  return new Promise(function (resolve, reject) {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options).then(function (response) {
      return handleErrors(response);
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.errors) reject(response.errors);else resolve(response);
    }).catch(function (err) {
      return reject(err);
    });
  });
}
module.exports = exports['default'];