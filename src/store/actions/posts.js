import apiRequest from '@/services/api';
import {
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  ADD_POST,
} from '@/store/actionTypes';
import { addError, removeError } from './error';

export const getPostsAction = (posts) => ({
  type: GET_POSTS,
  posts,
});

export const getPosts = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const result = await apiRequest('get', '/api/posts');
    const { data } = result;

    setLoading(false);
    dispatch(getPostsAction(data));
    dispatch(removeError());
    // alert(JSON.stringify(data));
  } catch (error) {
    setLoading(false);
    dispatch(addError(error));
  }
};

export const addPostAction = (post) => ({
  type: ADD_POST,
  post,
});

export const addPost = async (dispatch, setLoading, formInput) => {
  setLoading(true);
  try {
    const data = await apiRequest('post', '/api/posts', formInput);

    setLoading(false);
    dispatch(addPostAction(data));
    dispatch(removeError());
  } catch (error) {
    setLoading(false);
    dispatch(addError(error));
  }
};

export const deletePostAction = (id) => ({
  type: DELETE_POST,
  id,
});

export const deletePost = async (dispatch, setLoading, id) => {
  setLoading(true);
  try {
    const result = await apiRequest('delete', `/api/posts/${id}`);
    dispatch(deletePostAction(id));
    setLoading(false);
    dispatch(removeError());
  } catch (error) {
    setLoading(false);
    dispatch(addError(error));
  }
};
