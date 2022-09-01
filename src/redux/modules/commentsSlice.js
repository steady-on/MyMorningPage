import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./API";
// import { isDev, serverUrl } from ".";

/* comment property -postId, Id, userId, content, editToggle 
    const comment = {
      postId: postId, 
      id: "", 
      userId: userId, 
      content: commentContent, 
    }
    */

// thunk 함수 정의
// 특정 postId를 가진 댓글만 가져오기
export const __getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.get(`/comments?postId=${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comments/addComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/comments", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (payload, thunkAPI) => {
    try {
      await api.delete(`/comments/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "comments/updateComment",
  async (payload, thunkAPI) => {
    try {
      api.patch(`/comments/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.error = action.payload;
    },

    // addComment : comment를 db에 추가
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // deleteComment : comment 삭제
    [__deleteComment.pending]: () => {},
    [__deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__addComment.rejected]: () => {},

    // 댓글 수정
    [__updateComment.pending]: () => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},
  },
});

export default commentsSlice.reducer;
