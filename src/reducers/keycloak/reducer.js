import { keycloakActions } from '../../actions';

const keycloak = (state = null, action) => {
  switch (action.type) {
    case keycloakActions.SET:
      return action.keycloak;
    case keycloakActions.DELETE:
      return null;
    default:
      return state;
  }
};

export default keycloak;
