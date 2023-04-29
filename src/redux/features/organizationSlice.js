import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
    organization: []
};

export const getOrganization = createAsyncThunk('kris/getOrganizations', 
  async (cache=false) => {
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
