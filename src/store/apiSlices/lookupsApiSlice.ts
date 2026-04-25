import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLookupsApi } from '@/services/lookupsService';
import type { Lookups } from '@/types';

import { type ApiError, type ApiState, States } from '../types';

type LookupsApiState = ApiState<Lookups>;

const initialState: LookupsApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchLookups = createAsyncThunk<
  Lookups,
  void,
  { rejectValue: ApiError }
>('lookupsApi/fetchLookups', async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetchLookupsApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load lookups',
    });
  }
});

const lookupsApiSlice = createSlice({
  name: 'lookupsApi',
  initialState,
  reducers: {
    resetLookups: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLookups.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchLookups.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLookups.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetLookups } = lookupsApiSlice.actions;
export default lookupsApiSlice.reducer;
