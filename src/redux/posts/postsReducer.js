import { combineReducers } from 'redux';
import { ActionType } from './postsActions';
import { ActionType as CurrentPostActionType } from '../currentPost/currentPostActions';

const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_POSTS_SUCCESS:
      return payload.posts;
    case ActionType.CREATE_POST_SUCCESS:
      return [payload.post, ...state];
    case CurrentPostActionType.UPDATE_POST_SUCCESS:
      return [
        payload.post,
        ...state.filter(item => item.id !== payload.post.id),
      ];
    case ActionType.DELETE_POST_SUCCESS:
      return [...state.filter(item => item.id !== payload.id)];
    default:
      return state;
  }
};
const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case ActionType.FETCH_POST_START:
    case ActionType.CREATE_POST_START:
    case CurrentPostActionType.UPDATE_POST_START:
    case ActionType.DELETE_POST_START:
      return true;

    case ActionType.FETCH_POSTS_SUCCESS:
    case ActionType.CREATE_POST_SUCCESS:
    case CurrentPostActionType.UPDATE_POST_SUCCESS:
    case ActionType.DELETE_POST_SUCCESS:
    case ActionType.FETCH_POSTS_ERROR:
    case ActionType.CREATE_POST_ERROR:
    case CurrentPostActionType.UPDATE_POST_ERROR:
    case ActionType.DELETE_POST_ERROR:
      return false;

    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_POST_START:
    case ActionType.CREATE_POST_START:
    case CurrentPostActionType.UPDATE_POST_START:
    case ActionType.DELETE_POST_START:
    case ActionType.FETCH_POSTS_SUCCESS:
    case ActionType.CREATE_POST_SUCCESS:
    case CurrentPostActionType.UPDATE_POST_SUCCESS:
    case ActionType.DELETE_POST_SUCCESS:
      return null;

    case ActionType.FETCH_POSTS_ERROR:
    case ActionType.CREATE_POST_ERROR:
    case CurrentPostActionType.UPDATE_POST_ERROR:
    case ActionType.DELETE_POST_ERROR:
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
