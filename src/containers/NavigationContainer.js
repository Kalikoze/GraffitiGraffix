import React from 'react';
import { connect } from 'react-redux';
import { storeCurrentUser, postNewUser } from '../actions/index';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ storeCurrentUser, postNewUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps);
