import { ActionType } from './postsActions';

export const fetchPostsStart = () => ({
  type: ActionType.FETCH_POSTS_START,
});

export const fetchPostsSuccess = posts => ({
  type: ActionType.FETCH_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

export const fetchPostsError = error => ({
  type: ActionType.FETCH_POSTS_ERROR,
  payload: {
    error,
  },
});
export const createPostStart = () => ({
  type: ActionType.CREATE_POST_START,
});

export const createPostSuccess = post => ({
  type: ActionType.CREATE_POST_SUCCESS,
  payload: {
    post,
  },
});

export const createPostError = error => ({
  type: ActionType.CREATE_POST_ERROR,
  payload: {
    error,
  },
});
export const deletePostStart = () => ({
  type: ActionType.DELETE_POST_START,
});

export const deletePostSuccess = id => ({
  type: ActionType.DELETE_POST_SUCCESS,
  payload: {
    id,
  },
});

export const deletePostError = error => ({
  type: ActionType.DELETE_POST_ERROR,
  payload: {
    error,
  },
});
