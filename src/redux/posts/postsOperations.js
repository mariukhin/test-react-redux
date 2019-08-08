import axios from 'axios';

import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsError,
  createPostStart,
  createPostSuccess,
  createPostError,
  deletePostStart,
  deletePostSuccess,
  deletePostError,
} from './postsActionCreators';
import { DEFAULT_API, axiosConfig } from '../../service/helper';

export const fetchPosts = () => dispatch => {
  dispatch(fetchPostsStart());
  axios
    .get(`${DEFAULT_API}/posts`)
    .then(response => {
      dispatch(fetchPostsSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchPostsError(error));
    });
};
export const createPost = post => dispatch => {
  dispatch(createPostStart());

  axios
    .post(`${DEFAULT_API}/posts`, JSON.stringify(post), axiosConfig)
    .then(response => dispatch(createPostSuccess(response.data)))
    .catch(error => dispatch(createPostError(error)));
};
export const deletePost = id => dispatch => {
  dispatch(deletePostStart());
  axios
    .delete(`${DEFAULT_API}/posts/${id}`)
    .then(dispatch(deletePostSuccess(id)))
    .catch(error => dispatch(deletePostError(error)));
};
