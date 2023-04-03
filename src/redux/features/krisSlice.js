import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: []
};

export const krisSlice = createSlice({
  name: "kris",
  initialState,
  reducers: {
    reset: () => initialState,
    setKris: (state, action) => {
      state.list = action.payload
    }
  },
});

export const {
  setKris,
  reset,
} = krisSlice.actions;

export default krisSlice.reducer;
