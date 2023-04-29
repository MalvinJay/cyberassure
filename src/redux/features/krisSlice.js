import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  list: []
};

export const getKRIs = createAsyncThunk('kris/getKRIs', 
  async (cache=false) => {
    const response = await api.get("kri/get-kris");
    return response?.data?.message;
  }
);

export const getKRByKRIId = createAsyncThunk('kris/getKeyResults', 
  async (id='') => {
    const response = await api.get(`key-result/get-key-results?kri_id=${id}`);
    return response?.data?.message;
  }
);

export const addKeyResult = createAsyncThunk('kris/addKeyResults', 
  async (id='') => {
    const response = await api.get(`key-result/create-key-result`);
    return response?.data?.message;
  }
);

export const krisSlice = createSlice({
  name: "kris",
  initialState,
  reducers: {
    reset: () => initialState,
    setKris: (state, action) => {
      state.list = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getKRIs.fulfilled, (state, action) => {
      state.list = action.payload
    })
  }
});

export const {
  setKris,
  reset,
} = krisSlice.actions;

export default krisSlice.reducer;
