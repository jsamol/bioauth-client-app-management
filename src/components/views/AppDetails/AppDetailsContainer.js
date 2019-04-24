import { connect } from 'react-redux';
import AppDetails from './AppDetails';
import stringUtils from '../../../utils/stringUtils';

const mapStateToProps = (state, ownProps) => ({
  app: state.apps.find((app) => stringUtils.toUrlParam(app.name) === ownProps.match.params.appName),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppDetails);
