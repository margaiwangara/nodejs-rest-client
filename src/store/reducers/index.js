import { combineReducers } from 'redux';
import user from './auth';
import error from './error';
import users from './user';
import posts from './post';

const rootReducer = combineReducers({
  user,
  error,
  users,
  posts,
});

export default rootReducer;
