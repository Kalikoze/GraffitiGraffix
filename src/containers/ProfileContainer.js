import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchClickedArtist, storeClickedImage, storeClickedArtist, updateBio } from '../actions/index';

const mapStateToProps = state => ({
  clickedArtist: state.clickedArtist,
  currentUser: state.currentUser,
  clickedImage: state.clickedImage,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchClickedArtist, storeClickedImage, storeClickedArtist, updateBio }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps);
