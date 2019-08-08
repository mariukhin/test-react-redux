import axios from 'axios';
import {
  fetchCurrentPostStart,
  fetchCurrentPostSuccess,
  fetchCurrentPostError,
  updatePostStart,
  updatePostSuccess,
  updatePostError,
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
    .put(`${DEFAULT_API}/posts/${post.id}`, JSON.stringify(post), axiosConfig)
    .then(response => dispatch(updatePostSuccess(response.data)))
    .catch(error => dispatch(updatePostError(error)));
};
