import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  // cart: [],
  userInfo: null,
};

export const smartSlice = createSlice({
  name: "smart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        console.log("incremented");
        item.quantity += action.payload.quantity;
      } else {
        console.log("pushed");
        state.productData.push(action.payload);
      }
    },

    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },

    incrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    // =========== User Section ============= //
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
  addUser,
  removeUser,
} = smartSlice.actions;

export default smartSlice.reducer;
