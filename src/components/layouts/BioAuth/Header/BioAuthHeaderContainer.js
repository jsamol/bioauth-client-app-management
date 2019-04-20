import {connect} from 'react-redux';
import BioAuthHeader from "./BioAuthHeader";

const mapStateToProps = (state) => ({
  email: state.userInfo ? state.userInfo.email : ""
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BioAuthHeader);
