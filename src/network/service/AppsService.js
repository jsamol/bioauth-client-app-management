import axios from 'axios';
import {apps_path} from "../ApiConst";

export const getApps = (headers, onSuccess, onError) => {
  axios({
    method: 'get',
    url: apps_path,
    headers
  }).then(onSuccess)
    .catch(onError)
};
