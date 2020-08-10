import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  SEND_TWO_FACTOR_CODE,
  CONFIRM_TWO_FACTOR_CODE,
} from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  code: null,
  expiry: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
      };
    case SEND_TWO_FACTOR_CODE:
      return {
        ...state,
        code: action.code,
        expiry: action.expiry,
      };

    case CONFIRM_TWO_FACTOR_CODE:
      return {
        ...state,
        code: null,
        expiry: null,
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}

export default authReducer;
