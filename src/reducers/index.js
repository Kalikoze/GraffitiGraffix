import { combineReducers } from 'redux';
import currentUser from './storeCurrentUser';
import clickedArtist from './clickedArtist';

const rootReducer = combineReducers({
  currentUser,
  clickedArtist
});

export default rootReducer;
