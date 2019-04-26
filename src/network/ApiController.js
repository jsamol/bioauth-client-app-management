import fetchInterceptor from 'fetch-intercept';
import { addApp, getApps } from './service/AppsService';
import { contentType, header, httpStatus } from './ApiConst';

const apiController = {
  get headers() {
    let headers = {};
    headers[header.CONTENT_TYPE] = contentType.JSON;
    return headers;
  },
  request: () => {},

  registerInterceptor(onRequest = ((url, config) => [url, config]),
                      onRequestError = ((error) => error),
                      onResponse = ((response) => response),
                      onResponseError = ((error) => error)) {
    fetchInterceptor.register({
      request(url, config) {
        return onRequest(url, config);
      },

      requestError(error) {
        apiController.unregisterRequest();
        return Promise.reject(onRequestError(error));
      },

      response(response) {
        if (response.status !== httpStatus.UNAUTHORIZED) {
          apiController.unregisterRequest();
        }
        return onResponse(response);
      },

      responseError(error) {
        apiController.unregisterRequest();
        return onResponseError(error);
      }
    });
  },

  getApps(onSuccess, onError, doFinally = (() => {})) {
    apiController.registerRequest(() => getApps(apiController.headers, onSuccess, onError, doFinally));
  },

  registerApp(name, description, onSuccess, onError, doFinally = (() => {})) {
    const app = {
      name,
      description,
    };

    apiController.registerRequest(() => addApp(app, apiController.headers, onSuccess, onError, doFinally));
  },

  registerRequest(request) {
    apiController.request = request;
    apiController.request();
  },

  unregisterRequest() {
    apiController.request = () => {};
  },
};

export default apiController;
