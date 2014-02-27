/**
 * A lightweight and promise-based XHR wrapper.
 * @module ajax-promise
 */

/* Setup Promise polyfill */
require('es6-promise').polyfill();

/* Module dependencies */
var xhrObj = require('xhr'),
    extend = require('extend');

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

function Ajax(method, url, options, data) {
    var xhr = xhrObj(),
        options = extend(defaultOptions, options);

    return new Promise(function(resolve, reject) {
        xhr.open(method, url, options.async);

        xhr.onreadystatechange = function() {
            switch(xhr.readyState) {
                case XHR_DONE:
                    if (xhr.status) resolve(xhr.response);
                    else reject(Error(xhr.statusText));
                    break;
            }
        };

        xhr.send();
    });
};

/* Setup shortcut attributes */
['head', 'get', 'put', 'post', 'delete', 'patch', 'trace', 'connect', 'options']
    .forEach(function(method) {
        Ajax[method] = function(url, options, data) {
            return Ajax(method, url, options, data);
        }
    });
