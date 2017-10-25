import React from 'react';
import './MainSection.css';

const MainSection = ({ articleClass, src, title, info }) => {
  return (
    <article className={`main-section ${articleClass}`}>
      <img src={src} class="main-section-image" />
      <section className="content">
        <h2>
          {title}
        </h2>
        <p>
          {info}
        </p>
      </section>
    </article>
  );
};

export default MainSection;
