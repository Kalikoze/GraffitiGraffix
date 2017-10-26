import React from 'react';
import './SingleArtist.css';

const SingleArtist = ({ id, name, tag, latestImages, shortBio, followersCount }) => {
  const images = latestImages.map((url, i) => <img className='single-artist-image' key={i} src={url} alt="latest images"/>);

  return (
    <article className='l-single-artist'>
      <div className='l-name-tag'>
        <h3 className='single-artist-name'>{name}</h3>
        <img className='single-artist-tag' src={tag} alt="artist tag"/>
      </div>
      <div className='l-single-artist-images'>
        {images}
      </div>
    </article>
  );
};

export default SingleArtist;
