import axios from 'axios';

import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsError,
} from './postsActionCreators';
import { DEFAULT_API } from '../../service/helper';


export const fetchPosts = () => dispatch => {
  dispatch(fetchPostsStart());
  return axios
    .get(`${DEFAULT_API}/posts`)
    .then(response => {
      dispatch(fetchPostsSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchPostsError(error));
    });
};
export const llll = () => null;
