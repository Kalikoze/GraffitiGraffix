import React from 'react';
import { connect } from 'react-redux';
import { fetchClickedArtist } from '../actions/index';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return { clickedArtist: state.clickedArtist };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClickedArtist }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps);
