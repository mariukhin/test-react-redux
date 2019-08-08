import { combineReducers } from 'redux';
import postsReducer from './posts/postsReducer';
import currentPostIdReducer from './currentPost/currentPostIdReducer';
import currentPostReducer from './currentPost/currentPostReducer';
// import {
//   userIdReducer,
//   timeStartReducer,
// } from './languageDescrPage/languageDescrPageReducer';
// import currentQuestionReducer from './languageDescrPage/languageDescrPageCurrentQuestionReducer';
// import startPageReducer from './startPageRedux/startPageReducers';
// import startPageSetLanguage from './startPageRedux/startPageSetLanguage';
// import {
//   userAnswerReducer,
//   resultAnsweredReducer,
//   nextQuestionAnswerReducer,
//   finalResultReducer,
// } from './testPage/testPageReducers';

// тут импортируем редюсеры

const rootReducer = combineReducers({
  posts: postsReducer,
  currentPostId: currentPostIdReducer,
  currentPost: currentPostReducer,
});

export default rootReducer;
