import { combineReducers } from 'redux';

import auth from './auth';
import suggestions from './suggestions';

export default combineReducers({
  auth,
  suggestions
});
