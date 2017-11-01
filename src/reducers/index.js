import { combineReducers } from 'redux';
import currentUser from './storeCurrentUser';

const rootReducer = combineReducers({
  currentUser
});

export default rootReducer;
