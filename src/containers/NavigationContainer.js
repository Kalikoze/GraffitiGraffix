import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeCurrentUser, postNewUser, fetchClickedArtist, fetchAllArtists } from '../actions/index';

const mapStateToProps = state => ({ currentUser: state.currentUser, artists: state.artists });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ storeCurrentUser, postNewUser, fetchClickedArtist, fetchAllArtists }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps);
