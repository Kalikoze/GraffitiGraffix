import React from 'react';
import MainSection from '../MainSection/MainSection';
import './Main.css';
import GraffitiGraffix from '../assets/GraffitiGraffix.mp4';
import audio from '../assets/Insane-In-The-Brain.mp3';
import PaintSplashLeft from '../assets/paint-splash-left.gif';
import PaintsplashRight from '../assets/splash-paint-right.png';
import PaintExplosion from '../assets/paint-explosion.png';

const Main = () =>
  (
    <div className="main">
      <section className="l-above-fold">
        <video src={GraffitiGraffix} autoPlay loop />
        <audio src={audio} autoPlay />
      </section>
      <section className="title">
        <h1>Graffiti Graffix</h1>
      </section>
      <section className="l-below-fold">
        <MainSection
          src={PaintSplashLeft}
          title="The Latest & Greatest"
          articleClass="latest"
          info="See artist's latest and greatest works.  Filter through artists and find who's most popular and who's new!  Get to know your competition, and be relevant in the GraffitiGraffix community."
        />
        <MainSection
          src={PaintsplashRight}
          title="Be Seen, Get Known"
          articleClass="seen"
          info="Create your own profile, upload your own pictures, and get known by your own personal tag.  Get to the top of the charts by getting other users to follow you!"
        />
        <MainSection
          src={PaintExplosion}
          title="Choose Your Experience"
          articleClass="experience"
          info="Follow the artists that you care about most, and keep up to date with their latest graffiti postings.  Create the community by being the community."
        />
      </section>
    </div>);

export default Main;
