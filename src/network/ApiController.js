import {getApps} from './service/AppsService'
import {header} from "./ApiConst";

export const apiController = {
  token: null,

  getApps: (onSuccess, onError) => {
    let headers = {};
    if (apiController.token) {
      headers[header.AUTHORIZATION] = `Bearer ${apiController.token}`;
    }
    getApps(headers, onSuccess, onError)
  }
};
