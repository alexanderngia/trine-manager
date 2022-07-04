import { createSlice } from "@reduxjs/toolkit";
export interface CartState {}

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: any, { action }: any) => {
      const product = action.payload;
      console.log(product, "product");
      // const itemExisted = state.find((item: any) => item.id === product.id);
      // if (itemExisted) {
      //   return state.map((item: any) => {
      //     if (item.id === product.id) {
      //       return {
      //         ...item,
      //         quantity: item.quantity + 1,
      //       };
      //     }
      //     return item;
      //   });
      // } else {
      //   // console.log(payload, "payload");
      //   state.push({ ...payload, quantity: 1 });
      // }
    },
    increment: (state: any, { payload }: any) => {
      return state.map((item: any) => {
        if (item.id === payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decrement: (state: any, { payload }: any) => {
      return state.map((item: any) => {
        if (item.id === payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    clear: (state) => {
      return [];
    },
  },
});

//Action
export const cartActions = cartSlice.actions;
// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
