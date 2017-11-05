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

  componentDidMount() {
    const { id } = this.props.clickedImage;
    fetch(`http://localhost:3001/api/v1/comments/${id}`)
      .then(response => response.json())
      .then(comments => this.setState({ comments }))
      .catch(error => console.log(error));
  }

  displayComments() {
    return this.state.comments.map(comment =>
      <p key={comment.id}>
        {comment.comment}
      </p>
    );
  }

  render() {
    const { url, id } = this.props.clickedImage;
    const { toggleImage } = this.props;
    return (
      <section className="single-image">
        <img src={url} />
        <article className="comments">
          {this.displayComments()}
        </article>
        <button onClick={() => toggleImage(null, null)}>Close</button>
      </section>
    );
  }
}

export default ProfileContainer(SingleImage);
