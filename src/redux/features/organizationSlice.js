import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
    organization: []
};

export const getOrganization = createAsyncThunk('organization/getOrganizations', 
  async (cache=false, thunkAPI) => {
    // Cache mechanism
    const { organization } = thunkAPI.getState();
    if (cache && organization?.organization?.length > 0) return organization?.organization;

    const response = await api.get("organization/get-organizations");
    return response?.data?.message;
  }
);

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
      reset: () => initialState,
      setDepartment: (state, action) => {
        state.organization = action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getOrganization.fulfilled, (state, action) => {
        state.organization = action.payload
      })
    }
});

export const {
    setDepartment,
    reset,
} = organizationSlice.actions;
  
export default organizationSlice.reducer;
