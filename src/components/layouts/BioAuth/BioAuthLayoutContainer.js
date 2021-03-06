import { connect } from 'react-redux';
import { setApps, setUserInfo } from '../../../actions';
import BioAuthLayout from './BioAuthLayout';

const mapStateToProps = (state) => ({
  apps: state.apps,
  userInfo: state.userInfo,
  authenticated: state.keycloak !== null,
  loadUserInfo: state.keycloak ? state.keycloak.loadUserInfo : (() => {}),
});

const mapDispatchToProps = (dispatch) => ({
  setApps: (apps) => dispatch(setApps(apps)),
  setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BioAuthLayout);
