import React from 'react';
import { Link } from 'react-router-dom';
import './SingleArtist.css';
import ProfileContainer from '../../../containers/ProfileContainer';

const SingleArtist = ({
  id,
  username,
  tag,
  latestImages,
  clickArtist,
  currentUser,
}) => {
  const images = latestImages.map((img, id) =>
    (<img
      className="single-artist-image"
      key={id}
      src={img.url}
      alt="latest images"
    />),
);

  const path = currentUser.id ? '/profile' : '/artists';

  return (
    <Link
      className="l-single-artist"
      to={path}
      data-artist={id}
      onClick={e => clickArtist(e)}
    >
      <article className="l-name-tag">
        <h3 className="single-artist-name">
          {username}
        </h3>
        <img className="single-artist-tag" src={tag} alt="artist tag" />
      </article>
      <div className="l-single-artist-images">
        {images}
      </div>
  </Link>
  );
};

export default ProfileContainer(SingleArtist);
