const request = require("request-promise").defaults({
  resolveWithFullResponse: true,
  simple: false
});
const config = require("config");
const apiConfig = config.get("api");
const STAND_URL = `http://localhost:${apiConfig.port}`;

const defaultOptions = {
  json: true
};

const getEndpointUrlForModel = (modelName, uriParam) => {
  let endpointUrl = `${STAND_URL}`;

  if (modelName) {
    endpointUrl = `${endpointUrl}/api/${modelName}s`;
  }

  if (uriParam) {
    endpointUrl = `${endpointUrl}/${uriParam}`;
  }

  return endpointUrl;
};

const requestService = {
  get: (
    modelName,
    body = {},
    options = {
      uriParam: null
    }
  ) => {
    return request({
      method: "get",
      uri: getEndpointUrlForModel(modelName, options.uriParam),
      body: body,
      ...defaultOptions,
      ...options
    });
  },
  post: (modelName, body = {}, options = {}) => {
    return request({
      method: "post",
      uri: getEndpointUrlForModel(modelName),
      body: body,
      ...defaultOptions,
      ...options
    });
  },
  put: (modelName, body = {}, options = {}) => {
    return request({
      method: "put",
      uri: getEndpointUrlForModel(modelName),
      body: body,
      ...defaultOptions,
      ...options
    });
  },
  delete: (modelName, body = {}, options = {}) => {
    return request({
      method: "delete",
      uri: getEndpointUrlForModel(modelName),
      body: body,
      ...defaultOptions,
      ...options
    });
  }
};

module.exports = requestService;
