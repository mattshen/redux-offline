'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.NetworkError = NetworkError;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var babelPluginFlowReactPropTypes_proptype_OfflineAction = require('../types').babelPluginFlowReactPropTypes_proptype_OfflineAction || require('react').PropTypes.any;
/*global fetch*/

function NetworkError(response, status) {
  this.name = 'NetworkError';
  this.status = status;
  this.response = response;
}

//$FlowFixMe
NetworkError.prototype = Error.prototype;
NetworkError.prototype.status = null;

var getResponseBody = function getResponseBody(res) {
  var contentType = res.headers.get('content-type');
  return contentType.indexOf('json') >= 0 ? res.json() : res.text();
};

exports.default = function (effect, _action) {
  var url = effect.url,
      options = _objectWithoutProperties(effect, ['url']);

  var headers = _extends({ 'content-type': 'application/json' }, options.headers);
  return fetch(url, _extends({}, options, { headers: headers })).then(function (res) {
    if (res.ok) {
      return getResponseBody(res);
    } else {
      return getResponseBody(res).then(function (body) {
        throw new NetworkError(body, res.status);
      });
    }
  });
};