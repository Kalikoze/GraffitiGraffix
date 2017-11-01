import React, { Component } from 'react';
import Filter from '../Filter/Filter'
import './Artists.css'
import SingleArtist from '../SingleArtist/SingleArtist';

export default class Artists extends Component {
  constructor() {
    super()
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    return Promise.all([this.fetchArtists(), this.fetchImages()])
    .then(response => this.setState({artists: this.assignImages(response[0], response[1])}))
  }

  fetchArtists() {
    return fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(artists => artists)
  }

  fetchImages() {
    return fetch('http://localhost:3001/api/v1/images')
      .then(response => response.json())
      .then(images => images)
  }

  assignImages(artists, images) {
    return artists.map((artist, i) => {
      const artistImages = images.filter(image => image.user_id === artist.id);
      return Object.assign({}, artist, {latestImages: artistImages.slice(0, 3)})
    })
  }

  render() {
    const artistList = this.state.artists.map((artist, i) => <SingleArtist key={i} {...artist}/>);

    return (
      <section className="l-artists">
        <Filter />
        {artistList}
      </section>
    )
  }
}
