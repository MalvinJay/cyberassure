import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  profile: {
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
  }
};

// Custom action thunks
export const getProfile = createAsyncThunk('user/getUserProfile', 
  async (cache=true, thunkAPI) => {
    // Check if profile already has data, return it else make network request
    const { profile } = thunkAPI.getState();
    if (cache && profile?.profile?.id) return profile?.profile;

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
