import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  user: {},
  users: []
};

export const getUsers = createAsyncThunk('user/getUsers', 
  async (cache=false) => {
    const response = await api.get("user/get-users");
    return response?.data?.message;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }  
});

export const {
  setUser,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
