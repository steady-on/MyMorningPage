import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./API";

export const __getComment = createAsyncThunk(
  "comments/getComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.get(`/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  comment: { postId: 0, id: 0, userId: "", content: "" },
  isLoading: false,
  error: null,
  globalEditmode: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.comment.content = "";
    },
    globalEditModeToggle: (state, action) => {
      state.globalEditmode = action.payload;
    },
  },
  extraReducers: {
    // id가 일치하는 comment를 가지고 옴
    [__getComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
    },
  },
});

export const { clearComment, globalEditModeToggle } = commentSlice.actions;
export default commentSlice.reducer;
