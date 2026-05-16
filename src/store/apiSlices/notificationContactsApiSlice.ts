import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNotificationContactsApi } from '@/services/configurationService';
import type { NotificationContactsApiResponse } from '@/types/configuration';
import { type ApiError, type ApiState, States } from '../types';

type NotificationContactsApiSliceState =
  ApiState<NotificationContactsApiResponse>;

const initialState: NotificationContactsApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchNotificationContacts = createAsyncThunk<
  NotificationContactsApiResponse,
  void,
  { rejectValue: ApiError }
>(
  'notificationContactsApi/fetchNotificationContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNotificationContactsApi();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load notification contacts',
      });
    }
  },
);

const notificationContactsApiSlice = createSlice({
  name: 'notificationContactsApi',
  initialState,
  reducers: {
    resetNotificationContacts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationContacts.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchNotificationContacts.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchNotificationContacts.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetNotificationContacts } =
  notificationContactsApiSlice.actions;
export default notificationContactsApiSlice.reducer;
