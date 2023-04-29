import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access_token: "",
    expires_in: 2220,
    refresh_expires_in: 1800,
    refresh_token: "",
    token_type: "Bearer",
    id_token: "",
    "not-before-policy": 0,
    session_state: "",
    scope: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action) => {
      state = { ...action.payload }
    },
  }
});

export const {
  setUser,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
