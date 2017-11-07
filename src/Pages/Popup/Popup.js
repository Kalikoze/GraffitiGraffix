import React from 'react';
import './Popup.css';

const Popup = ({showPopup}) => {
  return (
    <article className="popup">
      <p className="popup-txt">You need to be signed in to view this artist</p>
      <button onClick={() => showPopup()}>Close</button>
    </article>
  )
}

export default Popup;
