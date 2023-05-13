import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
    departments: []
};

export const getDepartments = createAsyncThunk('department/getDepartments', 
  async (cache=false, thunkAPI) => {
    const { departments } = thunkAPI.getState();
    if (cache && departments?.departments?.length > 0) return departments?.departments;

    const response = await api.get("department/get-departments");
    return response?.data?.message;
  }
);

export const departmentSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
      reset: () => initialState,
      setDepartment: (state, action) => {
        state.departments = action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getDepartments.fulfilled, (state, action) => {
        state.departments = action.payload
      })
    }
});

export const {
    setDepartment,
    reset,
} = departmentSlice.actions;
  
export default departmentSlice.reducer;
