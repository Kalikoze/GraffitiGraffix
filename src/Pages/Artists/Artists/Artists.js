import React, { Component } from 'react';
import Filter from '../Filter/Filter';
import './Artists.css';
import SingleArtist from '../SingleArtist/SingleArtist';
import missingImg from '../assets/missingImg.jpg';
import missingTag from '../assets/missing-tag.png';

export default class Artists extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
    };
    this.sortNewest = this.sortNewest.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
  }

  componentDidMount() {
    return Promise.all([
      this.fetchArtists(),
      this.fetchImages(),
    ]).then(response =>
      this.setState({ artists: this.assignImages(response[0], response[1]) }),
    );
  }

  fetchArtists() {
    return fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(artists => artists);
  }

  fetchImages() {
    return fetch('http://localhost:3001/api/v1/images')
      .then(response => response.json())
      .then(images => images);
  }

  assignImages(artists, images) {
    return artists.map(artist => {
      const artistImages = images.filter(image => image.user_id === artist.id);
      for (let j = 0; j < 3; j++) {
        if (!artistImages[j]) {
          artistImages.push({ url: missingImg });
        }
      }

      if (!artist.tag) {
        artist.tag = missingTag;
      }
      return Object.assign({}, artist, {
        latestImages: artistImages.slice(0, 3),
      });
    });
  }

  sortNewest() {
    const { artists } = this.state;
    const datedArtists = artists.map(artist => {
      artist.created_at = artist.created_at.split(' ')[0].split('T')[0];
      return artist;
    });
    const sortedArtists = datedArtists.sort(
      (a, b) => a.created_at < b.created_at,
    );

    this.setState({ artists: sortedArtists });
  }

  sortAlphabetically() {
    const { artists } = this.state;

    const sortedArtists = artists.sort((a, b) => a.username > b.username);
    this.setState({ artists: sortedArtists });
  }

  sortByPopularity() {
    const { artists } = this.state;
    const artistPromises = artists.map(artist =>
      fetch(`http://localhost:3001/api/v1/followers/${artist.id}`)
        .then(response => response.json())
        .then(followers => ({
          followers: followers.length || 0,
          artist_id: artist.id,
        })),
    );

    Promise.all(artistPromises).then(fetchedArtists => {
      const newArtists = this.state.fetchedArtists.map(artist => {
        fetchedArtists.forEach(followerObject => {
          if (followerObject.artist_id === artist.id) {
            artist = Object.assign({}, artist, {
              followerCount: followerObject.followers,
            });
          }
        });
        return artist;
      });
      const sortedArtists = newArtists.sort(
        (a, b) => a.followerCount < b.followerCount,
      );
      this.setState({ artists: sortedArtists });
    });
  }

  render() {
    const artistList = this.state.artists.map((artist, i) =>
      <SingleArtist key={i} {...artist} />,
    );

    return (
      <section className="l-artists">
        <Filter
          sortNewest={this.sortNewest}
          sortAlphabetically={this.sortAlphabetically}
          sortByPopularity={this.sortByPopularity}
        />
        {artistList}
      </section>
    );
  }
}
