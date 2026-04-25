import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchTankerUploadColumnsApi } from '@/services/tankerUploadService';
import type { TankerUploadColumn } from '@/types';

import { type ApiError, type ApiState, States } from '../types';

type TankerUploadColumnsApiState = ApiState<TankerUploadColumn[]>;

const initialState: TankerUploadColumnsApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchTankerUploadColumns = createAsyncThunk<
  TankerUploadColumn[],
  void,
  { rejectValue: ApiError }
>(
  'tankerUploadColumnsApi/fetchTankerUploadColumns',
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetchTankerUploadColumnsApi();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load upload column schema',
      });
    }
  },
);

const tankerUploadColumnsApiSlice = createSlice({
  name: 'tankerUploadColumnsApi',
  initialState,
  reducers: {
    resetTankerUploadColumns: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTankerUploadColumns.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchTankerUploadColumns.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchTankerUploadColumns.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetTankerUploadColumns } = tankerUploadColumnsApiSlice.actions;
export default tankerUploadColumnsApiSlice.reducer;
