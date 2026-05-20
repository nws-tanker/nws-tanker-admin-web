import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUserApi } from '@/services/currentUserService';
import type { CurrentUser } from '@/types/currentUser';
import { type ApiError, type ApiState, States } from '../types';

type CurrentUserApiState = ApiState<CurrentUser>;

const initialState: CurrentUserApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk<
  CurrentUser,
  void,
  { rejectValue: ApiError }
>('currentUserApi/fetch', async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentUserApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load user profile',
    });
  }
});

const currentUserApiSlice = createSlice({
  name: 'currentUserApi',
  initialState,
  reducers: {
    resetCurrentUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetCurrentUser } = currentUserApiSlice.actions;
export default currentUserApiSlice.reducer;
