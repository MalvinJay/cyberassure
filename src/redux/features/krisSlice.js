import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/config";

const initialState = {
  list: [],
  key_results_cache: []
};

export const getKRIs = createAsyncThunk('kris/getKRIs', 
  async ( cache=true, thunkAPI) => {
    const { kris } = thunkAPI.getState();
    if (cache && kris?.list?.length > 0) return kris?.list;

    // const filters={ page: 1, limit: 10 }
    let url = "kri/get-kris";
    // url += createQueryParams(filters);

    const response = await api.get(url);
    return response?.data?.message;
  }
);

export const getKRByKRIId = createAsyncThunk('kris/getKeyResults', 
  async (id='', thunkAPI) => {
    const { kris } = thunkAPI.getState();
    const key_results_cache = kris?.key_results_cache?.find((el) => el.id === id)
    if (key_results_cache) return key_results_cache?.list;

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
    }),
    builder.addCase(getKRByKRIId.fulfilled, (state, action) => {
      state.key_results_cache = [
        ...state.key_results_cache,
        {
          id: action.meta.arg,
          list: action.payload
        }
      ]
    })
  }
});

export const {
  setKris,
  reset,
} = krisSlice.actions;

export default krisSlice.reducer;
