import { combineReducers } from 'redux';
import apps from './app/reducer';
import keycloak from './keycloak/reducer';
import userInfo from './userInfo/reducer';

export default combineReducers({
  apps,
  keycloak,
  userInfo,
});
