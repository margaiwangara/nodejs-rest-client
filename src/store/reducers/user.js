import { GET_USERS } from '../actionTypes';

const INITIAL_STATE = {
  count: 0,
  users: [],
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        count: action.count,
        users: action.users,
      };
    default:
      return state;
  }
}

export default userReducer;
