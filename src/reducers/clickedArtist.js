const clickedArtist = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_CLICKED_ARTIST':
      return action.artist;
    default:
      return state;
  }
}

export default clickedArtist;
