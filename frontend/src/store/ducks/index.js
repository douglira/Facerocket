import { combineReducers } from 'redux';

import user from './user';
import posts from './posts';

import notification from './notification';

export default combineReducers({
  user,
  posts,
  notification,
});
