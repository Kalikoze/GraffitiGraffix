import React from 'react';
import { connect } from 'react-redux';
import { storeCurrentUser } from '../actions/index';
import Navigation from '../Pages/Main/Navigation/Navigation';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ storeCurrentUser: storeCurrentUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
