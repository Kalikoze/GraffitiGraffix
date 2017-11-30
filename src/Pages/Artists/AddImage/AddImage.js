import React, { Component } from 'react';
import './AddImage.css';

class AddImage extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
    };
  }

  render() {
    const { url } = this.state;
    const { addImage, addImgErr, closeWindow } = this.props;
    const isDisabled = !url;

    return (
      <article className="add-image">
        <div className="image-input-container">
          <label htmlFor="add-image-input">Image URL:</label>
          <input
            type="text"
            id="add-image-input"
            placeholder="Paste Image URL Here"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
          />
          {addImgErr && <p className="add-img-err">Image already exists.</p>}
          <button
            className="add-image-btn"
            onClick={() => (addImage(url), this.setState({url: ''}))}
            disabled={isDisabled}
          >
            Add Image
          </button>
          <button
            className="add-image-btn"
            onClick={() => closeWindow()}
          >
            Close
          </button>
        </div>
      </article>
    );
  }
}

export default AddImage;
