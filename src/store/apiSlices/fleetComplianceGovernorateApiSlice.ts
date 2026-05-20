import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGovernorateComplianceApi } from '@/services/fleetComplianceService';
import type {
  FleetComplianceParams,
  GovernorateComplianceResponse,
} from '@/types/fleetCompliance';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<GovernorateComplianceResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchGovernorateCompliance = createAsyncThunk<
  GovernorateComplianceResponse,
  FleetComplianceParams,
  { rejectValue: ApiError }
>('fleetComplianceGovernorateApi/fetch', async (body, { rejectWithValue }) => {
  try {
    const response = await fetchGovernorateComplianceApi(body);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load governorate compliance',
    });
  }
});

const fleetComplianceGovernorateApiSlice = createSlice({
  name: 'fleetComplianceGovernorateApi',
  initialState,
  reducers: { resetGovernorateCompliance: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGovernorateCompliance.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchGovernorateCompliance.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchGovernorateCompliance.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetGovernorateCompliance } =
  fleetComplianceGovernorateApiSlice.actions;
export default fleetComplianceGovernorateApiSlice.reducer;
