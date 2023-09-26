import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

// slice is a portion of the Redux state managed by a specific reducer. In this case, the smartSlice contains the productData and userInfo state.
export const smartSlice = createSlice({
  name: "smart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload
      );

      // It tries to find a product in productData whose _id matches the payload of the action.
      // If such a product is found, it increases the product's quantity by the quantity in the payload.
      // If no such product is found, it adds the payload to productData.
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload); // payload is any data that should be used by the action.
      }
    },
  },
});

export const { addToCart } = smartSlice.actions;
export default smartSlice.reducer;
