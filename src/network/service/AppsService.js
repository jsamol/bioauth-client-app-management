import { appsPath, httpMethod } from '../ApiConst';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
};

export const getApps = (headers, onSuccess, onError, doFinally) => {
  fetch(appsPath, {
    method: httpMethod.GET,
    headers,
  }).then((res) => handleResponse(res))
    .then((data) => onSuccess(data))
    .catch((error) => onError(error))
    .finally(() => doFinally());
};

export const addApp = (app, headers, onSuccess, onError, doFinally) => {
  fetch(appsPath, {
    method: httpMethod.POST,
    headers,
    body: JSON.stringify(app),
  }).then((res) => handleResponse(res))
    .then((data) => onSuccess(data))
    .catch((error) => onError(error))
    .finally(() => doFinally());
};
