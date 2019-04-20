import { connect } from 'react-redux';
import NewApp from './NewApp';
import { addApp } from '../../../actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addApp: (app) => dispatch(addApp(app)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewApp);
