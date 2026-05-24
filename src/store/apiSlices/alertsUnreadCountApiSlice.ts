import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAlertsUnreadCountApi } from '@/services/alertService';
import type { AlertsUnreadCountResponse } from '@/types/alerts';
import { type ApiError, type ApiState, States } from '../types';

type AlertsUnreadCountApiState = ApiState<AlertsUnreadCountResponse>;

const initialState: AlertsUnreadCountApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchAlertsUnreadCount = createAsyncThunk<
  AlertsUnreadCountResponse,
  void,
  { rejectValue: ApiError }
>(
  'alertsUnreadCountApi/fetchAlertsUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAlertsUnreadCountApi();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load unread count',
      });
    }
  },
);

const alertsUnreadCountApiSlice = createSlice({
  name: 'alertsUnreadCountApi',
  initialState,
  reducers: {
    resetAlertsUnreadCount: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlertsUnreadCount.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchAlertsUnreadCount.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAlertsUnreadCount.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetAlertsUnreadCount } = alertsUnreadCountApiSlice.actions;
export default alertsUnreadCountApiSlice.reducer;
