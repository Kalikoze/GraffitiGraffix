import React from 'react';
import { Link } from 'react-router-dom';
import './SingleArtist.css';
import ProfileContainer from '../../../containers/ProfileContainer';

const SingleArtist = ({ id, username, tag, latestImages, shortBio, fetchClickedArtist }) => {
	const images = latestImages.map((img, i) => (
		<img
			className="single-artist-image"
			key={i}
			src={img.url}
			alt="latest images"
		/>
	));

	const storeClickedArtist = (e) => {
		fetchClickedArtist(e.currentTarget.dataset.artist)
	}

	return (
		<article className="l-single-artist">
			<Link className="l-name-tag" to="/profile" data-artist={id} onClick={(e) => storeClickedArtist(e)}>
				<h3 className="single-artist-name">{username}</h3>
				<img className="single-artist-tag" src={tag} alt="artist tag" />
			</Link>
			<div className="l-single-artist-images">{images}</div>
		</article>
	);
};

export default ProfileContainer(SingleArtist);
