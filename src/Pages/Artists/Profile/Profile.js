import React, { Component } from 'react';
import { VictoryChart, VictoryArea, VictoryTheme } from 'victory';
import ProfileContainer from '../../../containers/ProfileContainer';
import SingleImage from '../SingleImage/SingleImage';
import './Profile.css';
import AddImage from '../AddImage/AddImage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      data: [],
      followers: [],
      addImage: false,
      followStatus: false,
      showImage: false,
    };
    this.addImage = this.addImage.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { clickedArtist } = nextProps;

    fetch(`/api/v1/images/${clickedArtist.id}`)
      .then(response => response.json())
      .then(images => this.setState({ images }));

    fetch(`/api/v1/followers/${clickedArtist.id}`)
      .then(response => response.json())
      .then(followers => this.setState({ followers }))
      .catch(error => console.log({ error }));
  }

  addImage(url) {
    const { id } = this.props.currentUser;
    const image = {
      url,
      user_id: id,
    };

    fetch('/api/v1/images', {
      method: 'POST',
      body: JSON.stringify(image),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(parsedResponse => this.addImageToState(parsedResponse[0]))
      .catch(error => console.log({ error }));
  }

  addImageToState(image) {
    this.setState({
      images: [...this.state.images, image],
    });
  }

  toggleImage(url, id) {
    this.props.storeClickedImage(url, id);
    this.setState({ showImage: !this.state.showImage });
  }

  displayImages() {
    let { images } = this.state;

    if (images.error) {
      images = [];
    }

    return images.map(image =>
      (<img
        onClick={() => this.toggleImage(image.url, image.id)}
        className="profile-imgs"
        key={image.id}
        src={`${image.url}`}
        alt=""
      />),
    );
  }

  verifyUserProfile() {
    const loggedInUserUID = JSON.parse(
      localStorage.getItem(Object.keys(localStorage)[0]),
    ).uid;
    const { clickedArtist } = this.props;

    if (loggedInUserUID === clickedArtist.google_uid) {
      return true;
    }
    return false;
  }

  followArtist() {
    const { id: artist_id } = this.props.clickedArtist;
    const { id: follower_id } = this.props.currentUser;

    const postFollower = {
      artist_id,
      follower_id,
    };

    fetch('/api/v1/followers', {
      method: 'POST',
      body: JSON.stringify(postFollower),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(follower =>
        this.setState({
          followers: [...this.state.followers, follower[0]],
          followStatus: true,
        }),
      )
      .catch(error => console.log({ error }));
  }

  unfollowArtist() {
    const { id: artist_id } = this.props.clickedArtist;
    const { id: follower_id } = this.props.currentUser;

    fetch(
      `/api/v1/followers/${artist_id}/${follower_id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ artist_id, follower_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(() => {
      const newFollowers = this.state.followers.filter(
        follower =>
          follower.artist_id !== artist_id &&
          follower.follower_id !== follower_id,
      );
      this.setState({ followers: newFollowers, followStatus: false });
    });
  }

  checkIfFollowing() {
    const { followers } = this.state;
    const { id: artist_id } = this.props.clickedArtist;
    const { id: follower_id } = this.props.currentUser;

    const isFollowed = followers.findIndex(
      follower =>
        follower.artist_id === artist_id &&
        follower.follower_id === follower_id,
    );

    console.log(isFollowed);

    return isFollowed !== -1 ? this.unfollowArtist() : this.followArtist();
  }

  render() {
    const { clickedArtist } = this.props;
    const { addImage, followStatus, showImage } = this.state;
    const { tag, name, username, shortBio } = clickedArtist;
    const followText = followStatus ? 'Unfollow' : 'Follow';

    return (
      <section className="artist-profile">
        <section className="artist-info">
          <article className="artist-user">
            <img src={tag} alt="artist tag" className="artist-tag" />
            <p>
              {username}
            </p>
            <p>
              {name}
            </p>
            {!this.verifyUserProfile() &&
              <button onClick={() => this.checkIfFollowing()}>
                {followText}
              </button>}
          </article>
          <section className="artist-bio">
            <p>
              {shortBio}
            </p>
          </section>
          <section className="artist-stats">
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="myGradient">
                  <stop offset="0%" stopColor="red" />
                  <stop offset="25%" stopColor="red" />
                  <stop offset="25%" stopColor="orange" />
                  <stop offset="50%" stopColor="orange" />
                  <stop offset="50%" stopColor="gold" />
                  <stop offset="75%" stopColor="gold" />
                  <stop offset="75%" stopColor="yellow" />
                  <stop offset="100%" stopColor="yellow" />
                </linearGradient>
              </defs>
            </svg>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryArea
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                  onEnter: { duration: 500, before: () => ({ y: 0 }) },
                }}
                x="day"
                y="fire"
                style={{
                  data: { fill: 'url(#myGradient)' },
                }}
                data={[
                  { day: 1, fire: 2 },
                  { day: 2, fire: 3 },
                  { day: 3, fire: 7 },
                  { day: 4, fire: 4 },
                  { day: 4, fire: 8 },
                  { day: 4, fire: 4 },
                  { day: 5, fire: 5 },
                ]}
              />
            </VictoryChart>
          </section>
        </section>
        <section className="artist-profile-images">
          {this.displayImages()}
          {this.verifyUserProfile() &&
            <button onClick={() => this.setState({ addImage: true })}>
              Add Image
            </button>}
          {addImage && <AddImage addImage={this.addImage} />}
        </section>
        {showImage && <SingleImage toggleImage={this.toggleImage} />}
      </section>
    );
  }
}

export default ProfileContainer(Profile);
