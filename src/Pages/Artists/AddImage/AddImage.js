import React, { Component } from 'react';
import './AddImage.css';

const AddImage = () => {
  console.log('addimage')
  return (
    <article className="add-image">
      <label htmlFor="add-image-input">Image URL:</label>
      <input type="text" id="add-image-input" placeholder="Paste Image URL Here"/>
      <button className="add-image-btn">Add Image</button>
    </article>
  )
}

export default AddImage;
