import {getApps} from './service'

export const apiController = {
  token: null,

  getApps: (onSuccess, onError) => {
    let headers = {};
    if (apiController.token) {
      headers = {
        'Authorization': `Bearer ${apiController.token}`
      }
    }
    getApps(headers, onSuccess, onError)
  }
};
