import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeCurrentUser, postNewUser, fetchClickedArtist } from '../actions/index';

const mapStateToProps = state => ({ currentUser: state.currentUser });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ storeCurrentUser, postNewUser, fetchClickedArtist }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps);
