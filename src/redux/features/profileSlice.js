import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  profile: null
};

// Custom action thunks
export const getProfile = createAsyncThunk(
  'profile/getProfile', 
  async () => {
    const response = await api.get("user/get-user-profile");
    return response?.data?.message;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => initialState,
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  }
});

export const {
  setProfile,
  reset
} = profileSlice.actions;

export default profileSlice.reducer;
