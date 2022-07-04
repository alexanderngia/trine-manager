import { createSlice } from "@reduxjs/toolkit";
export interface OrderState {
  order: any;
}

const initialState: OrderState = {
  order: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

//Action
export const orderActions = orderSlice.actions;
// Reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;
