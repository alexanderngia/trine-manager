import { createSlice } from "@reduxjs/toolkit";
export interface ProductState {
  product: any;
}

const initialState: ProductState = {
  product: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

//Action
export const productActions = productSlice.actions;
// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
