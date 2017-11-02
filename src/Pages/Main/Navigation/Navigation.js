import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import firebase, { signIn, signOut } from '../../../firebase.js';
import './Navigation.css';
import NavigationContainer from '../../../containers/NavigationContainer';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    const storageKeys = Object.keys(localStorage);
    const firebaseKey = storageKeys.filter(key => key.includes('firebase'));

    if (firebaseKey.length) {
      const parsedUser = JSON.parse(localStorage.getItem(firebaseKey[0]));
      this.fetchUID(parsedUser.uid);
    }
  }

  fetchUID(googleUID) {
    fetch(`http://localhost:3001/api/v1/users/auth/${googleUID}`)
      .then(response => response.json())
      .then(parsedResponse => this.handleUIDCheck(parsedResponse))
      .catch(error => console.log(error));
  }

  handleUIDCheck(response) {
    if (response.error) {
      this.props.storeCurrentUser({});
    } else {
      this.props.storeCurrentUser(response);
    }
  }

  sendSignInData() {
    localStorage.clear();
    signIn().then(response => this.fetchUID(response.user.uid));
  }

  signOutUser() {
    signOut().then(() => {
      this.props.storeCurrentUser({});
    });
  }

  signInSignOut() {
    const { currentUser } = this.props;

    currentUser.id ? this.signOutUser() : this.sendSignInData()
  }

  render() {
    const { search } = this.state;
    const { currentUser } = this.props
    console.log(currentUser);
    const userStatus = currentUser.id ? 'Sign Out' : 'Sign In'

    if (!currentUser) {
      return <Redirect to="/signup" />;
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
            {"What's Hot"}
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
            onClick={() => this.signInSignOut()}
          >
            {userStatus}
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavigationContainer(Navigation);
