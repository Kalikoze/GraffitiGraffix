import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;

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
            What's Hot
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink to="/" className="artists-link link">
            Artists
          </NavLink>
        </div>

        <div className="nav-section">
          <NavLink to="/" className="sign-up-link link">
            Sign Up
          </NavLink>
        </div>
      </nav>
    );
  }
}
