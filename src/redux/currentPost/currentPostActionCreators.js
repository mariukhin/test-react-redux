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
