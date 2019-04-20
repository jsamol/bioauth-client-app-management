export const appActions = {
  ADD: 'ADD_APP',
  SET: 'SET_APPS',
};

export const addApp = (app) => ({
  type: appActions.ADD,
  app,
});

export const setApps = (apps) => ({
  type: appActions.SET,
  apps,
});
