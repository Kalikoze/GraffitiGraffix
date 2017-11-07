const artists = (state=[], action) => {
  switch(action.type) {
    case 'STORE_ALL_ARTISTS':
      return action.artists
    default:
      return state
  }
}

export default artists;
