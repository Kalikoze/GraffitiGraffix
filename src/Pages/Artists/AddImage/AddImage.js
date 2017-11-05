import React, { Component } from 'react';
import './AddImage.css';

class AddImage extends Component {
  constructor() {
    super()
    this.state = {
      url: ''
    }
  }


  render() {
    const { url } = this.state;
    const { addImage } = this.props;
    const isDisabled = url ? false : true;

    return (
      <article className="add-image">
      <label htmlFor="add-image-input">Image URL:</label>
      <input type="text" id="add-image-input" placeholder="Paste Image URL Here" value={url} onChange={(e) => this.setState({ url: e.target.value })}/>
      <button className="add-image-btn" onClick={() => addImage(url)} disabled={isDisabled}>Add Image</button>
      </article>
    )
  }
}

export default AddImage;
