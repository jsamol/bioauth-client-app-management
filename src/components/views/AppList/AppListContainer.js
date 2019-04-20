import { connect } from 'react-redux';
import AppList from './AppList';

const mapStateToProps = (state) => ({
  apps: state.apps,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppList);
