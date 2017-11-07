import React from 'react';
import MainSection from '../MainSection/MainSection';
import './Main.css';
import GraffitiGraffix from '../assets/GraffitiGraffix.mp4';
import audio from '../assets/Insane-In-The-Brain.mp3';
import PaintSplashLeft from '../assets/paint-splash-left.gif';
import PaintsplashRight from '../assets/splash-paint-right.png';
import PaintExplosion from '../assets/paint-explosion.png';
// <audio src={audio} autoPlay />

const Main = () =>
  (<div className="main">
    <section className="l-above-fold">
      <video src={GraffitiGraffix} autoPlay loop />
    </section>
    <section className="title">
      <h1>Graffiti Graffix</h1>
    </section>
    <section className="l-below-fold">
      <MainSection
        src={PaintSplashLeft}
        title="Latest News"
        articleClass="news"
        info="hey"
      />
      <MainSection
        src={PaintsplashRight}
        title="What's Hot"
        articleClass="whats-hot"
        info="yo"
      />
      <MainSection
        src={PaintExplosion}
        title="Artists"
        articleClass="artists"
        info="suh"
      />
    </section>
   </div>);

export default Main;
