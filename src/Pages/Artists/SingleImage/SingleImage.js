import React, { Component } from 'react';
import ProfileContainer from '../../../containers/ProfileContainer';
import './SingleImage.css';

class SingleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  render() {
    const { url, id } = this.props.clickedImage;
    const { toggleImage } = this.props;
    return (
      <section className="single-image">
        <img src={url} />
        <article className="comments" />
        <button onClick={() => toggleImage(null, null)}>Close</button>
      </section>
    );
  }
}

export default ProfileContainer(SingleImage);
