import React, { Component } from 'react';
import './SingleImage.css';

export default class SingleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  render() {
    return (
      <section className="single-image">
        <img />
        <article className="comments" />
      </section>
    );
  }
}
