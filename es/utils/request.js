/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */
export default function request(url, options) {
  return new Promise(function (resolve, reject) {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(url, options).then(function (response) {
      if (!response.ok) throw response;
      return response;
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.errors) reject(response.errors);else resolve(response);
    });
  });
}