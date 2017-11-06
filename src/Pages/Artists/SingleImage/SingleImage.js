import React, { Component } from 'react';
import ProfileContainer from '../../../containers/ProfileContainer';
import './SingleImage.css';

class SingleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
      comments: []
    };
  }

  componentDidMount() {
    const { id } = this.props.clickedImage;
    fetch(`http://localhost:3001/api/v1/comments/${id}`)
      .then(response => response.json())
      .then(comments => {
        if (!comments.error) {
          return this.setState({ comments: comments.reverse() });
        }
      })
      .catch(error => console.log(error));
  }

  displayComments() {
    return this.state.comments.map(comment =>
      <p key={comment.id}>
        {comment.comment}
      </p>
    );
  }

  submitComment(e) {
    if(e.keyCode === 13) {
      const { id: user_id } = this.props.currentUser;
      const { id: image_id } = this.props.clickedImage;
      const { newComment: comment, comments } = this.state;

      const sendComment = {
        user_id,
        comment,
        image_id
      }

      fetch('http://localhost:3001/api/v1/comments', {
        method: 'POST',
        body: JSON.stringify(sendComment),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(comment => this.setState({comments: [...comments, comment[0]], newComment: ''}))
      .catch(error => console.log({ error }))
    }
  }

  render() {
    const { url, id } = this.props.clickedImage;
    const { toggleImage } = this.props;
    return (
      <section className="single-image">
        <img src={url} />
        <article className="comments-container">
          <article className="comments">
            {this.displayComments()}
          </article>
          <input className="add-comment"
          placeholder="Add a comment"
          value={this.state.newComment}
          onChange={e => this.setState({newComment: e.target.value})}
          onKeyDown={e => this.submitComment(e)}
        />
        </article>
        <button onClick={() => toggleImage(null, null)}>X</button>
      </section>
    );
  }
}

export default ProfileContainer(SingleImage);
