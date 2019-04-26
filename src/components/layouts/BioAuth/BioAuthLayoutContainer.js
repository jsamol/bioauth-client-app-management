import { connect } from 'react-redux';
import { deleteKeycloak, setApps, setKeycloak, setUserInfo } from '../../../actions';
import BioAuthLayout from './BioAuthLayout';

const mapStateToProps = (state) => ({
  apps: state.apps,

  keycloak: state.keycloak,
  authenticated: state.keycloak !== null,

  loadUserInfo: state.keycloak ? state.keycloak.loadUserInfo : (() => {}),
  updateToken: state.keycloak ? state.keycloak.updateToken : (() => {})
});

const mapDispatchToProps = (dispatch) => ({
  setApps: (apps) => dispatch(setApps(apps)),
  setKeycloak: (keycloak) => dispatch(setKeycloak(keycloak)),
  deleteKeycloak: () => dispatch(deleteKeycloak()),
  setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BioAuthLayout);
