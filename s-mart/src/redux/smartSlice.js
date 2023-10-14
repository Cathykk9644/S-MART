import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  // cart: [],
  userInfo: null,
};

// slice is a portion of the Redux state managed by a specific reducer. In this case, the smartSlice contains the productData and userInfo state.
export const smartSlice = createSlice({
  name: "smart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );

      // It tries to find a product in productData whose _id matches the payload of the action.
      // If such a product is found, it increases the product's quantity by the quantity in the payload.
      // If no such product is found, it adds the payload to productData.
      if (item) {
        console.log("incremented");
        item.quantity += action.payload.quantity;
      } else {
        console.log("pushed");
        state.productData.push(action.payload);
        // payload is any data that should be used by the action.
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
