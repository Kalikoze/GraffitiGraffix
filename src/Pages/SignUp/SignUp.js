import React, { Component } from 'react';
import './SignUp.css';
import NavigationContainer from '../../containers/NavigationContainer';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      shortBio: '',
      tag: ''
    };
  }

  createUser(e) {
    e.preventDefault();
    const storedInfo = JSON.parse(
      localStorage.getItem(Object.keys(localStorage)[0])
    );

    const googleInfo = {
      name: storedInfo.displayName,
      google_uid: storedInfo.uid
    };

    const newUser = Object.assign({}, this.state, googleInfo);
    this.props.postNewUser(newUser);
  }

  render() {
    const { username, shortBio, tag } = this.state;
    return (
      <section className="sign-up">
        <form className="user-info">
          <div className="username-container">
            <label htmlFor="username">Username:</label>
            <input
              value={username}
              id="username"
              placeholder="Enter a username..."
              minLength={3}
              maxLength={15}
              onChange={e => this.setState({ username: e.target.value })}
              required
            />
          </div>
          <div className="tag-container">
            <label>Tag Url:</label>
            <input
              value={tag}
              id="tag"
              placeholder="Enter a url for your tag..."
              onChange={e => this.setState({ tag: e.target.value })}
              type="url"
            />
          </div>
          <div className="short-bio-container">
            <label>Bio:</label>
            <textarea
              value={shortBio}
              id="short-bio"
              placeholder="Enter a short bio..."
              onChange={e => this.setState({ shortBio: e.target.value })}
            />
          </div>

          <button onClick={e => this.createUser(e)} className="sign-up-button">
            Sign Up
          </button>
        </form>
      </section>
    );
  }
}

export default NavigationContainer(SignUp);
