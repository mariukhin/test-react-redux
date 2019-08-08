import { ActionType } from './currentPostActions';

export const fetchCurrentPostStart = () => ({
  type: ActionType.FETCH_CURRENT_POST_START,
});

export const fetchCurrentPostSuccess = post => ({
  type: ActionType.FETCH_CURRENT_POST_SUCCESS,
  payload: {
    post,
  },
});

export const fetchCurrentPostError = error => ({
  type: ActionType.FETCH_CURRENT_POST_ERROR,
  payload: {
    error,
  },
});
export const setCurrentPostId = id => ({
  type: ActionType.SET_CURRENT_POST,
  payload: id,
});
export const updatePostStart = () => ({
  type: ActionType.UPDATE_POST_START,
});

export const updatePostSuccess = post => ({
  type: ActionType.UPDATE_POST_SUCCESS,
  payload: {
    post,
  },
});

export const updatePostError = error => ({
  type: ActionType.UPDATE_POST_ERROR,
  payload: {
    error,
  },
});
export const createCommentStart = () => ({
  type: ActionType.CREATE_COMMENT_START,
});

export const createCommentSuccess = comment => ({
  type: ActionType.CREATE_COMMENT_SUCCESS,
  payload: {
    comment,
  },
});

export const createCommentError = error => ({
  type: ActionType.CREATE_COMMENT_ERROR,
  payload: {
    error,
  },
});
