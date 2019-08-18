import { combineReducers } from 'redux';
import postsReducer from './posts/postsReducer';
import currentPostIdReducer from './currentPost/currentPostIdReducer';
import currentPostReducer from './currentPost/currentPostReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  currentPostId: currentPostIdReducer,
  currentPost: currentPostReducer,
});

export default rootReducer;
