import React from 'react';
import './Popup.css';

const Popup = ({showPopup, popupText}) => {
  const text = popupText === 'signin' ? 'You need to be signed in to view this artist.' : "User not found."
  return (
    <article className="popup">
      <p className="popup-txt">{text}</p>
      <button onClick={() => showPopup()}>Close</button>
    </article>
  )
}

export default Popup;
