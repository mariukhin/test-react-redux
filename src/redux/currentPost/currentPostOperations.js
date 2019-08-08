import axios from 'axios';
import {
  fetchCurrentPostStart,
  fetchCurrentPostSuccess,
  fetchCurrentPostError,
  updatePostStart,
  updatePostSuccess,
  updatePostError,
  createCommentStart,
  createCommentSuccess,
  createCommentError,
} from './currentPostActionCreators';
import { DEFAULT_API, axiosConfig } from '../../service/helper';

export const fetchCurrentPost = id => dispatch => {
  dispatch(fetchCurrentPostStart());
  axios
    .get(`${DEFAULT_API}/posts/${id}?_embed=comments`)
    .then(response => {
      dispatch(fetchCurrentPostSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchCurrentPostError(error));
    });
};

export const updatePost = post => dispatch => {
  dispatch(updatePostStart());
  axios
    .put(`${DEFAULT_API}/posts/${post.id}`, post, axiosConfig)
    .then(response => dispatch(updatePostSuccess(response.data)))
    .catch(error => dispatch(updatePostError(error)));
};
export const createComment = comment => dispatch => {
  dispatch(createCommentStart());

  return axios
    .post(`${DEFAULT_API}/comments`, comment, axiosConfig)
    .then(response => dispatch(createCommentSuccess(response.data)))
    .catch(error => dispatch(createCommentError(error)));
};
