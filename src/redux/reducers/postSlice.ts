import { createSlice } from "@reduxjs/toolkit";
export interface PostState {
  post: any;
}

const initialState: PostState = {
  post: "",
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    clearPost: (state) => {
      state.post = null;
    },
  },
});

//Action
export const postActions = postSlice.actions;
// Reducer
const postReducer = postSlice.reducer;
export default postReducer;
