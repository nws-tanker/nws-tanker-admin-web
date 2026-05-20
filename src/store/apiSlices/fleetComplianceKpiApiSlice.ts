import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFleetComplianceKpiApi } from '@/services/fleetComplianceService';
import type {
  FleetComplianceKpiResponse,
  FleetComplianceParams,
} from '@/types/fleetCompliance';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<FleetComplianceKpiResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchFleetComplianceKpi = createAsyncThunk<
  FleetComplianceKpiResponse,
  FleetComplianceParams,
  { rejectValue: ApiError }
>('fleetComplianceKpiApi/fetch', async (body, { rejectWithValue }) => {
  try {
    const response = await fetchFleetComplianceKpiApi(body);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load fleet compliance KPI',
    });
  }
});

const fleetComplianceKpiApiSlice = createSlice({
  name: 'fleetComplianceKpiApi',
  initialState,
  reducers: { resetFleetComplianceKpi: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFleetComplianceKpi.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchFleetComplianceKpi.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFleetComplianceKpi.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetFleetComplianceKpi } = fleetComplianceKpiApiSlice.actions;
export default fleetComplianceKpiApiSlice.reducer;
