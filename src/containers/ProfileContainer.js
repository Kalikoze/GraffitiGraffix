import React from 'react';
import { connect } from 'react-redux';
import { fetchClickedArtist, storeClickedImage } from '../actions/index';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return {
    clickedArtist: state.clickedArtist,
    currentUser: state.currentUser,
    clickedImage: state.clickedImage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchClickedArtist, storeClickedImage },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps);
