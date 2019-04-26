import { connect } from 'react-redux';
import { deleteKeycloak, setKeycloak } from '../../../actions';
import AuthorizationProvider from './AuthenticationProvider';

const mapStateToProps = (state) => ({
  keycloak: state.keycloak,
  authenticated: state.keycloak !== null,
});

const mapDispatchToProps = (dispatch) => ({
  setKeycloak: (keycloak) => dispatch(setKeycloak(keycloak)),
  deleteKeycloak: () => dispatch(deleteKeycloak()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizationProvider);
