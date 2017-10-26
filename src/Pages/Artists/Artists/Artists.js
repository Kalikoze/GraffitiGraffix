import React, { Component } from 'react';
import Filter from '../Filter/Filter'
import './Artists.css'
import helperArtists from '../../../helpers/helperArtists';
import SingleArtist from '../SingleArtist/SingleArtist';

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
    const artistList = helperArtists.map((artist, i) => <SingleArtist key={i} {...artist}/>);

    return (
      <section className="l-artists">
        <Filter />
        {artistList}
      </section>
    )
  }
}
