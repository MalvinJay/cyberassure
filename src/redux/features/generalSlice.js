import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultView: false,
  shrink: false
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    reset: () => initialState,
    setView: (state, action) => {
      state.defaultView = action.payload
    },
    setShrink: (state, action) => {
      state.shrink = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getUsers.fulfilled, (state, action) => {
    //   state.users = action.payload
    // })
  }
});

export const {
  reset,
  setView,
  setShrink
} = generalSlice.actions;

export default generalSlice.reducer;
