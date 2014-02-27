/**
 * A lightweight and promise-based XHR wrapper.
 * @module ajax-promise
 */

/* Module dependencies */
var xhrObj = require('xhr'),
    extend = require('extend');

/* Setup Promise polyfill */
require('es6-promise').polyfill();

exports = module.exports = Ajax;

/* ReadyState status codes */
var XHR_CLOSED = 0,
    XHR_OPENED = 1,
    XHR_SENT = 2,
    XHR_RECEIVED = 3,
    XHR_DONE = 4;

var defaultOptions = {
    async: true,
    headers: {}
};

/**
 * Main module object.
 *
 * @param {string} method - HTTP method to use.
 * @param {string} url - The URL to send the request to.
 * @param {Object} options - Request options.
 * @param {boolean} [options.async=true] - Whether or not to perform the
 *     request asynchronously.
 * @param {Object} [options.headers={}] - Optional HTTP headers to set.
 * @param {Object} data - The data to send in the request.
 */
function Ajax(method, url, options, data) {
    var xhr = xhrObj(),
        options = extend(defaultOptions, options);

    return new Promise(function(resolve, reject) {
        xhr.open(method, url, options.async);

        /* set request headers */
        Object.keys(options.headers).forEach(function(header) {
            xhr.setRequestHeader(header, options.headers[header]);
        });

        xhr.onreadystatechange = function() {
            switch(xhr.readyState) {
                case XHR_DONE:
                    if (xhr.status) resolve(xhr.response);
                    else reject(Error(xhr.statusText));
                    break;
            }
        };

        xhr.send(data);
    });
};

/* Setup shortcut attributes */
['head', 'get', 'put', 'post', 'delete', 'patch', 'trace', 'connect', 'options']
    .forEach(function(method) {
        Ajax[method] = function(url, options, data) {
            return Ajax(method, url, options, data);
        }
    });
