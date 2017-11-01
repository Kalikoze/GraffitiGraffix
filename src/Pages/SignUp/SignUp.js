import React, { Component } from 'react';
import './SignUp.css';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      shortBio: '',
      tag: ''
    };
  }

  render() {
    const { username, shortBio, tag } = this.state;
    return (
      <section className="sign-up">
        <form className="user-info">
          <div className="username-container">
            <label for="username">Username:</label>
            <input
              value={username}
              id="username"
              placeholder="Enter a username..."
              minlength={3}
              maxlength={15}
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

          <button className="sign-up-button" disabled>
            Sign Up
          </button>
        </form>
      </section>
    );
  }
}
