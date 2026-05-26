import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAlertsFeedApi } from '@/services/alertService';
import type { AlertsFeedParams, AlertsFeedResponse } from '@/types/alerts';
import { type ApiError, type ApiState, States } from '../types';

type AlertsFeedApiState = ApiState<AlertsFeedResponse>;

const initialState: AlertsFeedApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchAlertsFeed = createAsyncThunk<
  AlertsFeedResponse,
  AlertsFeedParams | undefined,
  { rejectValue: ApiError }
>('alertsFeedApi/fetchAlertsFeed', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchAlertsFeedApi(arg);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load notifications',
    });
  }
});

const alertsFeedApiSlice = createSlice({
  name: 'alertsFeedApi',
  initialState,
  reducers: {
    resetAlertsFeed: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsFeed.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchAlertsFeed.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAlertsFeed.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetAlertsFeed } = alertsFeedApiSlice.actions;
export default alertsFeedApiSlice.reducer;
