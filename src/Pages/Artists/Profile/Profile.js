import React, { Component } from 'react';
import ProfileContainer from '../../../containers/ProfileContainer';
import './Profile.css';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryChart, VictoryArea, VictoryTheme, VictoryStack } from 'victory';
import AddImage from '../AddImage/AddImage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      data: [],
      addImage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clickedArtist } = nextProps;

    fetch(`http://localhost:3001/api/v1/images/${clickedArtist.id}`)
      .then(response => response.json())
      .then(images => this.setState({ images }));
  }

  displayImages() {
    let { images } = this.state;

    if(images.error) {
      images = [];
    }

    return images.map(image => <img className='profile-imgs' key={image.id} src={`${image.url}`} alt="" />);
  }

  verifyUserProfile() {
    const loggedInUserUID = JSON.parse(
      localStorage.getItem(Object.keys(localStorage)[0])
    ).uid;
    const { clickedArtist } = this.props;

    if (loggedInUserUID === clickedArtist.google_uid) {
      console.log('same same');
      return true
    }
  }

  render() {
    const { clickedArtist } = this.props;
    const { addImage } = this.state;
    const { tag, name, username, shortBio } = clickedArtist;

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
                  onEnter: { duration: 500, before: () => ({ y: 0 }) }
                }}
                x="day"
                y="fire"
                style={{
                  data: { fill: 'url(#myGradient)' }
                }}
                data={[
                  { day: 1, fire: 2 },
                  { day: 2, fire: 3 },
                  { day: 3, fire: 7 },
                  { day: 4, fire: 4 },
                  { day: 4, fire: 8 },
                  { day: 4, fire: 4 },
                  { day: 5, fire: 5 }
                ]}
              />
            </VictoryChart>
          </section>
        </section>
        <section className="artist-profile-images">
          {this.displayImages()}
          {this.verifyUserProfile() && <button onClick={() => this.setState({ addImage: true })}>Add Image</button>}
          {addImage && <AddImage />}
        </section>
      </section>
    );
  }
}

export default ProfileContainer(Profile);
