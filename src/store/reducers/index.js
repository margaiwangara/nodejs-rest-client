import { combineReducers } from 'redux';
import user from './auth';
import error from './error';
import users from './user';

const rootReducer = combineReducers({
  user,
  error,
  users,
});

export default rootReducer;
