import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComplianceByTankerTypeApi } from '@/services/executiveDashboardService';
import type {
  ComplianceByTankerTypeResponse,
  DashboardParams,
} from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<ComplianceByTankerTypeResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardCompliance = createAsyncThunk<
  ComplianceByTankerTypeResponse,
  DashboardParams,
  { rejectValue: ApiError }
>(
  'executiveDashboardComplianceApi/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchComplianceByTankerTypeApi(params);
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load compliance data',
      });
    }
  },
);

const executiveDashboardComplianceApiSlice = createSlice({
  name: 'executiveDashboardComplianceApi',
  initialState,
  reducers: { resetExecutiveDashboardCompliance: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardCompliance.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardCompliance.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardCompliance.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardCompliance } =
  executiveDashboardComplianceApiSlice.actions;
export default executiveDashboardComplianceApiSlice.reducer;
