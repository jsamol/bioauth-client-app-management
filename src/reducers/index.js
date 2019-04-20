import {combineReducers} from "redux";
import apps from "./app/reducer";
import userInfo from "./userInfo/reducer";

export default combineReducers({
  apps,
  userInfo
})
