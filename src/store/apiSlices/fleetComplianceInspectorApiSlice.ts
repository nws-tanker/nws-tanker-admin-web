import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInspectorPerformanceApi } from '@/services/fleetComplianceService';
import type {
  FleetComplianceParams,
  InspectorPerformanceResponse,
} from '@/types/fleetCompliance';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<InspectorPerformanceResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInspectorPerformance = createAsyncThunk<
  InspectorPerformanceResponse,
  FleetComplianceParams,
  { rejectValue: ApiError }
>('fleetComplianceInspectorApi/fetch', async (body, { rejectWithValue }) => {
  try {
    const response = await fetchInspectorPerformanceApi(body);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load inspector performance',
    });
  }
});

const fleetComplianceInspectorApiSlice = createSlice({
  name: 'fleetComplianceInspectorApi',
  initialState,
  reducers: { resetInspectorPerformance: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectorPerformance.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInspectorPerformance.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInspectorPerformance.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInspectorPerformance } =
  fleetComplianceInspectorApiSlice.actions;
export default fleetComplianceInspectorApiSlice.reducer;
