import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInspectorDashboardApi } from '@/services/inspectorDashboardService';
import type { InspectorDashboardResponse } from '@/types/inspectorDashboard';
import { type ApiError, type ApiState, States } from '../types';

type InspectorDashboardApiSliceState = ApiState<InspectorDashboardResponse>;

const initialState: InspectorDashboardApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInspectorDashboard = createAsyncThunk<
  InspectorDashboardResponse,
  void,
  { rejectValue: ApiError }
>(
  'inspectorDashboardApi/fetchInspectorDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchInspectorDashboardApi();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load inspector dashboard',
      });
    }
  },
);

const inspectorDashboardApiSlice = createSlice({
  name: 'inspectorDashboardApi',
  initialState,
  reducers: {
    resetInspectorDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectorDashboard.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInspectorDashboard.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInspectorDashboard.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInspectorDashboard } = inspectorDashboardApiSlice.actions;
export default inspectorDashboardApiSlice.reducer;
