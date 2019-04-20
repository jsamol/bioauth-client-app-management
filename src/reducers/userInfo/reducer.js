import {userInfoActions} from "../../actions";

const userInfo = (state = null, action) => {
  switch (action.type) {
    case userInfoActions.SET:
      return action.userInfo;
    default:
      return state;
  }
};

export default userInfo;
