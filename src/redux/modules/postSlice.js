import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./API";

// thunk 함수 정의
export const __getPostById = createAsyncThunk(
  "posts/getPostById",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.get(`/posts/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updatePost = createAsyncThunk(
  "posts/updatePost",
  async (payload, thunkAPI) => {
    try {
      api.patch(`/posts/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  post: {
    userId: "",
    title: "",
    content: "",
    id: 0,
  },
  error: null,
  isLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.post = {
        userId: "",
        title: "",
        content: "",
        id: 0,
      };
    },
  },
  extraReducers: {
    // id가 일치하는 post를 가지고 옴
    [__getPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // id가 일치하는 post 수정
    [__updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
