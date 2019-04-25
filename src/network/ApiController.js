import fetchInterceptor from 'fetch-intercept';
import { addApp, getApps } from './service/AppsService';
import { contentType, header } from './ApiConst';

const apiController = {
  token: null,
  get headers() {
    let headers = {};
    headers[header.CONTENT_TYPE] = contentType.JSON;
    return headers;
  },

  registerInterceptor(onRequest = ((url, config) => [url, config]),
                      onRequestError = ((error) => error),
                      onResponse = ((response) => response),
                      onResponseError = ((error) => error)) {
    fetchInterceptor.register({
      request(url, config) {
        if (apiController.token) {
          config.headers[header.AUTHORIZATION] = `Bearer ${apiController.token}`
        }
        return onRequest(url, config);
      },

      requestError(error) {
        return Promise.reject(onRequestError(error));
      },

      response(response) {
        return onResponse(response);
      },

      responseError(error) {
        return onResponseError(error);
      }
    });
  },

  getApps(onSuccess, onError, doFinally = (() => {})) {
    getApps(apiController.headers, onSuccess, onError, doFinally);
  },

  registerApp(name, description, onSuccess, onError, doFinally = (() => {})) {
    const app = {
      name,
      description,
    };
    addApp(app, apiController.headers, onSuccess, onError, doFinally);
  },
};

export default apiController;
