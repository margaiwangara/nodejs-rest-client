import { combineReducers } from 'redux';
import user from './auth';
import error from './error';

const rootReducer = combineReducers({
  user,
  error,
});

export default rootReducer;
