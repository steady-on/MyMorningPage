import { combineReducers, configureStore } from "@reduxjs/toolkit";
// modules
import postSlice from "../modules/postSlice";
import postsSlice from "../modules/postsSlice";
import commentsSlice from "../modules/commentsSlice";
import commentSlice from "../modules/commentSlice";

const rootReducer = combineReducers({
  post: postSlice,
  posts: postsSlice,
  comment: commentSlice,
  comments: commentsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
