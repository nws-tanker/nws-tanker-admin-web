import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComplianceHeatmapApi } from '@/services/executiveDashboardService';
import type {
  ComplianceHeatmapResponse,
  DashboardParams,
} from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<ComplianceHeatmapResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardHeatmap = createAsyncThunk<
  ComplianceHeatmapResponse,
  DashboardParams,
  { rejectValue: ApiError }
>('executiveDashboardHeatmapApi/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchComplianceHeatmapApi(params);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load compliance heatmap',
    });
  }
});

const executiveDashboardHeatmapApiSlice = createSlice({
  name: 'executiveDashboardHeatmapApi',
  initialState,
  reducers: { resetExecutiveDashboardHeatmap: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardHeatmap.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardHeatmap.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardHeatmap.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardHeatmap } =
  executiveDashboardHeatmapApiSlice.actions;
export default executiveDashboardHeatmapApiSlice.reducer;
