import { combineReducers } from 'redux';
import currentUser from './storeCurrentUser';
import clickedArtist from './clickedArtist';
import clickedImage from './clickedImage';

const rootReducer = combineReducers({
  currentUser,
  clickedArtist,
  clickedImage
});

export default rootReducer;
