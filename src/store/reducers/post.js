import {
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  ADD_POST,
} from '@/store/actionTypes';

const INITIAL_STATE = {
  posts: [],
};

export default function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    case UPDATE_POST:
      const updated = state.posts.filter((p) => p._id !== action.payload.id);
      return {
        ...state,
        posts: [...updated, action.payload.post],
      };
    case DELETE_POST:
      const deleted = state.posts.filter((p) => p._id !== action.id);
      return {
        ...state,
        posts: deleted,
      };
    default:
      return state;
  }
}
