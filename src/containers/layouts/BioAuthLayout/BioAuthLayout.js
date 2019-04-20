import {connect} from 'react-redux';
import {BioAuthLayout} from "../../../components/layouts";
import {setApps} from "../../../actions";

const mapStateToProps = (state) => ({
  apps: state.apps
});

const mapDispatchToProps = (dispatch) => ({
  setApps: (apps) => dispatch(setApps(apps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BioAuthLayout);
