export const keycloakActions = {
  SET: 'SET_KEYCLOAK',
  DELETE: 'DELETE_KEYCLOAK',
};

export const setKeycloak = (keycloak) => ({
  type: keycloakActions.SET,
  keycloak,
});

export const deleteKeycloak = () => ({
  type: keycloakActions.DELETE,
});
