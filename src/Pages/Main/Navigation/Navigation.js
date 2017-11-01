import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import firebase, { signIn, signOut } from '../../../firebase.js';
import './Navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  fetchUID(googleUID) {
    fetch(`http://localhost:3001/api/v1/users/auth/${googleUID}`)
      .then(response => response.json())
      .then(parsedResponse => this.handleUIDCheck(parsedResponse))
      .catch(error => console.log(error));
  }

  handleUIDCheck(response) {
    console.log('user', response);
    if (response.error) {
      //send user to another page that would prompt them to make choose a username, add a shortBio, add a tag (Add name from google)
      //create account (response.google_uid)
      this.props.storeCurrentUser(null);
    } else {
      this.props.storeCurrentUser(response);
    }
  }

  sendSignInData() {
    signIn().then(response => this.fetchUID(response.user.uid));
  }

  signOutUser() {
    signOut().then(() => {
      console.log('logout response');
      this.props.storeCurrentUser(null);
    });
  }

  render() {
    const { search } = this.state;

    if(!this.props.currentUser) {
      return <Redirect to='/signup'/>
    }

    return (
      <nav>
        <input
          value={search}
          placeholder="Search for artist..."
          onChange={e => this.setState({ search: e.target.value })}
          className="search-bar"
        />

        <div className="nav-section">
          <NavLink to="/" className="news-link link">
            News
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink to="/" className="whats-hot-link link">
            `What's Hot`
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink to="/artists" className="artists-link link">
            Artists
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink
            to="/"
            className="sign-up-link link"
            onClick={() => this.sendSignInData()}
          >
            Sign Up
          </NavLink>
        </div>
        <div className="nav-section">
          <NavLink
            to="/"
            className="sign-up-link link"
            onClick={() => this.signOutUser()}
          >
            Sign Out
          </NavLink>
        </div>
      </nav>
    );
  }
}
