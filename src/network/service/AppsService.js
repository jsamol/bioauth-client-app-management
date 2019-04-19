import axios from 'axios';
import {apps_path} from "../ApiConst";

export const getApps = (onSuccess, onError) => {
  axios.get(apps_path)
    .then(onSuccess)
    .catch(onError)
};
