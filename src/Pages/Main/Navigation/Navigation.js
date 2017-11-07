import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn, signOut } from '../../../firebase';
import Popup from '../../Popup/Popup';
import './Navigation.css';
import NavigationContainer from '../../../containers/NavigationContainer';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      signInClicked: false,
      signOutClicked: false,
      foundArtist: false,
      showPopup: false
    };
    this.showPopup = this.showPopup.bind(this)
  }

  componentDidMount() {
    const { fetchAllArtists } = this.props;
    const storageKeys = Object.keys(localStorage);
    const firebaseKey = storageKeys.filter(key => key.includes('firebase'));

    if (firebaseKey.length) {
      const parsedUser = JSON.parse(localStorage.getItem(firebaseKey[0]));
      this.fetchUID(parsedUser.uid);
    }
    fetchAllArtists();
  }

  fetchUID(googleUID) {
    fetch(`/api/v1/users/auth/${googleUID}`)
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
    this.setState({
      signOutClicked: false,
      signInClicked: true,
    })
  }

  signOutUser() {
    signOut().then(() => {
      this.props.storeCurrentUser({});
      this.setState({
        signOutClicked: true,
        signInClicked: false,
      })
    });
  }

  signInSignOut() {
    const { currentUser } = this.props;

    return currentUser.id ? this.signOutUser() : this.sendSignInData()
  }

  searchArtist(e) {
    const { currentUser, artists, fetchClickedArtist } = this.props;
    const { search } = this.state;
    const foundArtist = artists.filter(artist => artist.username.toLowerCase() === search.toLowerCase());

    if(e.keyCode === 13 && currentUser.id && foundArtist[0]) {
      this.setState({foundArtist: true, search: ''});
      fetchClickedArtist(foundArtist[0].id)
    } else if (e.keyCode === 13 && !currentUser.id) {
      this.setState({showPopup: true, search: ''});
    } else if (e.keyCode === 13 && currentUser.id){
      this.setState({showPopup: true, search: ''});
    }
  }

  showPopup() {
    this.setState({showPopup: false});
  }

  render() {
    const { search, signInClicked, signOutClicked, foundArtist, showPopup } = this.state;
    const { currentUser, fetchClickedArtist } = this.props;
    const userStatus = currentUser.id ? 'Sign Out' : 'Sign In';

    if (!currentUser.id && signInClicked) {
      return <Redirect to="/signup" />;
    }

    if (signOutClicked) {
      return <Redirect to="/" />;
    }

    if(foundArtist) {
      return <Redirect to="/profile" />
    }


    return (
      <nav>
        <input
          value={search}
          placeholder="Search for artist..."
          onChange={e => this.setState({ search: e.target.value })}
          onKeyDown={e => this.searchArtist(e)}
          className="search-bar"
        />

        <div className="nav-section">
          <NavLink to="/" className="home-link link">
            Home
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink to="/artists" className="artists-link link">
            Artists
          </NavLink>
        </div>

        { currentUser.id &&
          <div className="nav-section">
            <NavLink to="/profile" onClick={() => fetchClickedArtist(currentUser.id)} className="profile-link link">
              Profile
            </NavLink>
          </div>
        }

        <div className="nav-section">
          <NavLink
            to="/"
            className="sign-up-link link"
            onClick={() => this.signInSignOut()}
          >
            {userStatus}
          </NavLink>
        </div>

        {showPopup && !currentUser.id && <Popup popupText={'signin'} showPopup={this.showPopup}/>}
        {showPopup && currentUser.id && <Popup popupText={'nouser'} showPopup={this.showPopup}/>}
      </nav>
    );
  }
}

export default NavigationContainer(Navigation);
