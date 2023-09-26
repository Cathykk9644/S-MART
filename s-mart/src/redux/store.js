import { configureStore } from "@reduxjs/toolkit";
import smartReducer from "./smartSlice";

export const store = configureStore({
  reducer: {
    smart: smartReducer,
  },
});

// all data that changes over time in your app is stored in the Redux store.
