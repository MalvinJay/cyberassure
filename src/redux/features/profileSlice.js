import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  org_name: "",
  ext_id: "",
  role_name: "",
  dept_name: "",
  created_at: "",
  updated_at: ""
};

// Custom action thunks
export const getProfile = createAsyncThunk('profile/getProfile', 
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
      state = { ...action.payload }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state = { ...action.payload }
    })
  }
});

export const {
  setProfile,
  reset
} = profileSlice.actions;

export default profileSlice.reducer;
