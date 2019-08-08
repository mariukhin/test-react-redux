import { combineReducers } from 'redux';
import { ActionType } from './currentPostActions';

const currentPostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_CURRENT_POST_SUCCESS:
    case ActionType.UPDATE_POST_SUCCESS:
      return payload.post;
    default:
      return state;
  }
};
const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case ActionType.FETCH_CURRENT_POST_START:
    case ActionType.UPDATE_POST_START:
    case ActionType.CREATE_COMMENT_START:
      return true;

    case ActionType.FETCH_CURRENT_POST_SUCCESS:
    case ActionType.FETCH_CURRENT_POST_ERROR:
    case ActionType.CREATE_COMMENT_SUCCESS:
    case ActionType.CREATE_COMMENT_ERROR:
    case ActionType.UPDATE_POST_SUCCESS:
    case ActionType.UPDATE_POST_ERROR:
      return false;

    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.FETCH_CURRENT_POST_START:
    case ActionType.FETCH_CURRENT_POST_SUCCESS:
    case ActionType.UPDATE_POST_START:
    case ActionType.UPDATE_POST_SUCCESS:
    case ActionType.CREATE_COMMENT_SUCCESS:
    case ActionType.CREATE_COMMENT_START:
      return null;

    case ActionType.FETCH_CURRENT_POST_ERROR:
    case ActionType.UPDATE_POST_ERROR:
    case ActionType.CREATE_COMMENT_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  currentPost: currentPostReducer,
  loading: loadingReducer,
  error: errorReducer,
});
