import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

const INITIAL_STATE = {
  error: null,
};

function errorReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default errorReducer;
