import React, { Component } from 'react';
import './SignUp.css';
import NavigationContainer from '../../containers/NavigationContainer';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      shortBio: '',
      tag: '',
      redirect: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps);
    if (nextProps.currentUser.google_uid) {
      this.setState({
        redirect: true
      })
    }
  }

  createUser(e) {
    e.preventDefault();
    const storedInfo = JSON.parse(
      localStorage.getItem(Object.keys(localStorage)[0])
    );

    const { username, shortBio, tag } = this.state;

    const googleInfo = {
      name: storedInfo.displayName,
      google_uid: storedInfo.uid
    };

    const stateInfo = {
      username,
      shortBio,
      tag
    }

    const newUser = Object.assign({}, stateInfo, googleInfo);
    this.props.postNewUser(newUser);
  }

  render() {
    const { username, shortBio, tag, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />
    }

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
