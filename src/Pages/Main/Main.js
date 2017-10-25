import React from 'react';
import GraffitiGraffix from "./assets/GraffitiGraffix.mp4";
import audio from './assets/Insane-In-The-Brain.mp3';
import PaintSplashLeft from "./assets/paint-splash-left.gif";
import PaintsplashRight from "./assets/splash-paint-right.png";
import PaintExplosion from "./assets/paint-explosion.png";

const Main = () => {
  return (
    <div className="main">
      <section className="l-above-fold">
        <video src={GraffitiGraffix} autoPlay loop></video>
        <audio src={audio} autoPlay></audio>
      </section>
      <section className="l-below-fold">
        <article className="news">
          <img src={PaintSplashLeft} />
          <section className="content">
            <h2>Latest News</h2>
            <p></p>
          </section>
        </article>
        <article className="whats-hot">
          <img src={PaintsplashRight} />
          <section className="content">
            <h2>"What's Hot"</h2>
            <p></p>
          </section>
        </article>
        <article className="artists">
          <img src={PaintExplosion} />
          <section className="content">
            <h2>Get Noticed</h2>
            <p></p>
          </section>
        </article>
      </section>
    </div>
  )
}

export default Main
