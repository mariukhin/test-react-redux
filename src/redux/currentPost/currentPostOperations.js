import axios from 'axios';
import {
  fetchCurrentPostStart,
  fetchCurrentPostSuccess,
  fetchCurrentPostError,
} from './currentPostActionCreators';
import { DEFAULT_API } from '../../service/helper';


export const fetchCurrentPost = id => dispatch => {
  dispatch(fetchCurrentPostStart());
  axios
    .get(`${DEFAULT_API}/posts/${id}`)
    .then(response => {
      dispatch(fetchCurrentPostSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchCurrentPostError(error));
    });
};
export const llll = () => null;
