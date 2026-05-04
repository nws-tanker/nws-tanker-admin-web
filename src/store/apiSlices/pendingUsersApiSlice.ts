import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchPendingUsersApi } from '@/services/configurationService';
import type { PendingRequest } from '@/types/configuration';

import { type ApiError, type ApiState, States } from '../types';

type PendingUsersApiState = ApiState<PendingRequest[]>;

const initialState: PendingUsersApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchPendingUsersThunk = createAsyncThunk<
  PendingRequest[],
  void,
  { rejectValue: ApiError }
>('pendingUsersApi/fetchPendingUsers', async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetchPendingUsersApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load pending users',
    });
  }
});

const pendingUsersApiSlice = createSlice({
  name: 'pendingUsersApi',
  initialState,
  reducers: {
    resetPendingUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsersThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchPendingUsersThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPendingUsersThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetPendingUsers } = pendingUsersApiSlice.actions;
export default pendingUsersApiSlice.reducer;
