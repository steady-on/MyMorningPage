import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./API";
// import { isDev, serverUrl } from ".";

// const useImmerReducer = (reducer, initial) =>
//   React.useReducer(produce(reducer), initial);

/* post property - postId, userId, content, editToggle
  const post = {
    postId: "",
    userId: "",
    title: "",
    content: "", 
  }
*/

// thunk 함수 정의
export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/posts");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "posts/addPost",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/posts", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.delete(`/posts/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPost: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    // getPosts : posts 전체 목록을 가지고 옴
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    // addPost : post를 db에 추가
    [__addPost.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // deletePost : postId가 일치하는 객체를 삭제
    [__deletePost.pending]: () => {},
    [__deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    [__deletePost.rejected]: () => {},
  },
});

export const { clearPost } = postsSlice.actions;
export default postsSlice.reducer;
