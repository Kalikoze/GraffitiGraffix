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
      followers: [],
      bio: '',
      addImage: false,
      followStatus: false,
      showImage: false,
      addImgErr: false,
    };
    this.addImage = this.addImage.bind(this);
    this.toggleImage = this.toggleImage.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  componentDidMount() {
    const { storeClickedArtist } = this.props;
    const artist = JSON.parse(localStorage.getItem('artist'));
    storeClickedArtist(artist);
    this.setState({bio: artist.shortBio});
  }

  componentWillReceiveProps(nextProps) {
    const { clickedArtist } = nextProps;

    fetch(`/api/v1/images/${clickedArtist.id}`)
      .then(response => response.json())
      .then(images => this.setState({ images }));

    fetch(`/api/v1/followers/${clickedArtist.id}`)
      .then(response => response.json())
      .then(followers => {

        if (followers.length) {
          this.setState({ followers }, () => {
            this.checkIfFollowing(true)
          })
        }
      })
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
      .then(parsedResponse => {
        if (parsedResponse.error) {
          return this.setState({addImgErr: true});
        }
        this.addImageToState(parsedResponse[0])
        this.closeWindow()
      })
      .catch(error => console.log({ error }));
  }

  addImageToState(image) {
    this.setState({
      images: [...this.state.images, image],
    });
  }

  deleteImage(e) {
    const id = e.target.dataset.id;

    fetch(`/api/v1/images/${id}`, {
      method: "DELETE"
    }).then(() => this.setState({images: this.state.images.filter(image => image.id !== parseInt(id, 10))}))
  }

  toggleImage(url, id) {
    this.props.storeClickedImage(url, id);
    this.setState({ showImage: !this.state.showImage });
  }

  closeWindow() {
    this.setState({ addImage: false })
  }

  displayImages() {
    let { images } = this.state;
    const deleteBtnClass = this.verifyUserProfile() ? 'delete-img' : 'hide'

    if (images.error) {
      images = [];
    }

    return images.map(image =>
      (
        <div className="image-container">
          <img
            onClick={() => this.toggleImage(image.url, image.id)}
            className="profile-imgs"
            key={image.id}
            src={`${image.url}`}
            alt=""
          />
          <button className={deleteBtnClass} onClick={e => this.deleteImage(e)} data-id={image.id}>X</button>
        </div>),
    );
  }

  verifyUserProfile() {
    const firebaseKey = Object.keys(localStorage).filter(key => key.includes('firebase'))[0];
    const loggedInUserUID = JSON.parse(
      localStorage.getItem(firebaseKey),
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

  checkIfFollowing(onLoad) {
    const { followers } = this.state;
    const { id: artist_id } = this.props.clickedArtist;
    const { id: follower_id } = this.props.currentUser;

    const isFollowed = followers.findIndex(
      follower =>
        follower.artist_id === artist_id &&
        follower.follower_id === follower_id,
    );

    if (onLoad) {
      return this.setState({ followStatus: true });
    }

    return isFollowed !== -1 ? this.unfollowArtist() : this.followArtist();
  }

  render() {
    const { clickedArtist, updateBio } = this.props;
    const { addImage, bio, followStatus, showImage, images, followers, addImgErr } = this.state;
    const { id, tag, name, username, shortBio } = clickedArtist;
    const followText = followStatus ? 'Unfollow' : 'Follow';
    console.log(clickedArtist)

    return (
      <section className="artist-profile">
        <section className="artist-info">
          <article className="artist-user">
            <img src={tag} alt="artist tag" className="artist-tag" />
            <p>
              {name}
            </p>
            <p>
              {username}
            </p>
          </article>
          <section className="artist-bio">
            <span>Short-Bio:</span>
            {!this.verifyUserProfile() && <p>{shortBio}</p>}
            {this.verifyUserProfile() && <textarea onBlur={() => updateBio(clickedArtist, bio)} value={this.state.bio} onChange={e => this.setState({bio: e.target.value})}>
            </textarea>}
            {this.verifyUserProfile() &&
              <button onClick={() => this.setState({ addImage: true, addImgErr: false })}>
                Add Image
              </button>}
              {!this.verifyUserProfile() &&
                <button onClick={() => this.checkIfFollowing()}>
                  {followText}
                </button>}
          </section>
          <section className='artist-count'>
            <h4 className="count-title">Followers</h4>
            <p className='count'>{followers.length || 0}</p>
            <h4 className="count-title">Images</h4>
            <p className='count'>{images.length || 0}</p>
          </section>
        </section>
        <section className="artist-profile-images">
          {this.displayImages()}
        </section>
        {addImage && <AddImage addImage={this.addImage} addImgErr={addImgErr} closeWindow={this.closeWindow}/>}
        {showImage && <SingleImage toggleImage={this.toggleImage} />}
      </section>
    );
  }
}

export default ProfileContainer(Profile);
