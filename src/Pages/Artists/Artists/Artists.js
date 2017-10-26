import React, { Component } from 'react';
import helperArtists from '../../../helpers/helperArtists';

export default class Artists extends Component {
  constructor() {
    super()
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    this.setState({
      artists: helperArtists
    })
  }

  render() {
    const artistList = helperArtists.map(artist => <SingleArtist {..artist}/>);

    return (
      <section className="l-artists">

      </section>
    )
  }
}
