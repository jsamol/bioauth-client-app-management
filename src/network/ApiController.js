import {addApp, getApps} from './service/AppsService'
import {contentType, header} from "./ApiConst";

export const apiController = {
  token: null,
  get headers() {
    let headers = {};
    if (apiController.token) {
      headers[header.AUTHORIZATION] = `Bearer ${this.token}`;
    }
    headers[header.CONTENT_TYPE] = contentType.JSON;
    return headers;
  },

  getApps(onSuccess, onError, doFinally=(() => {})) {
    getApps(apiController.headers, onSuccess, onError, doFinally)
  },

  registerApp(name, description, onSuccess, onError, doFinally=(() => {})) {
    const app = {
      name,
      description
    };
    addApp(app, apiController.headers, onSuccess, onError, doFinally);
  }
};
