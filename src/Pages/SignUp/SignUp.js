import React, { Component } from 'react';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      shortBio: '',
      tag: '',
    }
  }

  render() {
    const { username, shortBio, tag } = this.state
    return (
      <section className='sign-up'>
        <input value={username}
        className='username'
        placeholder='Enter a username...'
        onChange={e => this.setState({username: e.target.value})}
        />
        <input value={tag}
        className='tag'
        placeholder='Enter a url for your tag...'
        onChange={e => this.setState({tag: e.target.value})}
        />
        <textarea value={shortBio}
        className='short-bio'
        placeholder='Enter a short biography...'
        onChange={e => this.setState({shortBio: e.target.value})}>
        </textarea>
      </section>
    )
  }
}
