import axios from 'axios';
import {apps_path} from "../ApiConst";

export const getApps = (headers, onSuccess, onError, doFinally) => {
  axios({
    method: 'get',
    url: apps_path,
    headers
  }).then(onSuccess)
    .catch(onError)
    .then(doFinally)
};

export const addApp = (app, headers, onSuccess, onError, doFinally) => {
  axios({
    method: 'post',
    url: apps_path,
    data: app,
    headers
  }).then(onSuccess)
    .catch(onError)
    .then(doFinally)
};
