import { createSlice } from "@reduxjs/toolkit";
export interface MessState {
  message: string;
}

const initialState: MessState = {
  message: "",
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

//Action
export const messageActions = messageSlice.actions;
// Reducer
const messageReducer = messageSlice.reducer;
export default messageReducer;
