import { combineReducers } from 'redux';
import currentUser from './storeCurrentUser';
import clickedArtist from './clickedArtist';
import clickedImage from './clickedImage';
import artists from './storeAllArtists';

const rootReducer = combineReducers({
  currentUser,
  clickedArtist,
  clickedImage,
  artists
});

export default rootReducer;
