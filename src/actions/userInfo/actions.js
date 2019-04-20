export const userInfoActions = {
  SET: 'SET_USER_INFO'
};

export const setUserInfo = (userInfo) => ({
  type: userInfoActions.SET,
  userInfo
});
