import { appActions } from '../../actions';

const apps = (state = [], action) => {
  switch (action.type) {
    case appActions.ADD:
      return [
        ...state,
        action.app,
      ];
    case appActions.SET:
      return action.apps;
    default:
      return state;
  }
};

export default apps;
