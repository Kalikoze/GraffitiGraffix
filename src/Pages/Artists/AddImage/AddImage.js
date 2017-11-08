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
    const { addImage, closeWindow } = this.props;
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
          <button
            className="add-image-btn"
            onClick={() => addImage(url)}
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
