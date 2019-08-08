import { combineReducers } from 'redux';
import { ActionType } from './postsActions';

const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_POSTS_SUCCESS:
      return payload.posts;
    default:
      return state;
  }
};
const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case ActionType.FETCH_POST_START:
      return true;

    case ActionType.FETCH_POSTS_SUCCESS:
    case ActionType.FETCH_POSTS_ERROR:
      return false;

    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_POST_START:
    case ActionType.FETCH_POSTS_SUCCESS:
      return null;

    case ActionType.FETCH_POSTS_ERROR:
      return payload.error;

    default:
      return state;
  }
};

export default combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
  error: errorReducer,
});
