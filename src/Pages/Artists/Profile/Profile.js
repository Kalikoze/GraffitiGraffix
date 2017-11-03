import React from 'react';
import ProfileContainer from '../../../containers/ProfileContainer';

const Profile = ({ clickedArtist }) => {
  const { tag, name, username, shortBio } = clickedArtist;

  return (
    <section className="artist-profile">
      <article className="artist-info">
        <div>
          <img src={tag} alt="artist tag" />
          <p>{name}</p>
          <p>{username}</p>
        </div>
        <p>{shortBio}</p>
      </article>
      <article className="artist-stats">

      </article>
      <article className="artist-profile-images">

      </article>
    </section>
  )
}

export default ProfileContainer(Profile);
