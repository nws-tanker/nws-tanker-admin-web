import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchActiveUsers,
  type ActiveUsersFilters,
} from '@/services/configurationService';
import type { ActiveUserResponse } from '@/types';

import { type ApiError, type ApiState, States } from '../types';

type ActiveUsersApiState = ApiState<ActiveUserResponse[]>;

const initialState: ActiveUsersApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchActiveUsersThunk = createAsyncThunk<
  ActiveUserResponse[],
  ActiveUsersFilters,
  { rejectValue: ApiError }
>('activeUsersApi/fetchActiveUsers', async (filters, { rejectWithValue }) => {
  try {
    const response = await fetchActiveUsers(filters);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load active users',
    });
  }
});

const activeUsersApiSlice = createSlice({
  name: 'activeUsersApi',
  initialState,
  reducers: {
    resetActiveUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveUsersThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchActiveUsersThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchActiveUsersThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetActiveUsers } = activeUsersApiSlice.actions;
export default activeUsersApiSlice.reducer;
