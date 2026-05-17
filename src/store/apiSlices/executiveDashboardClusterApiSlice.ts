import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchClusterContractorBreakdownApi } from '@/services/executiveDashboardService';
import type {
  ClusterContractorBreakdownResponse,
  DashboardParams,
} from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<ClusterContractorBreakdownResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardCluster = createAsyncThunk<
  ClusterContractorBreakdownResponse,
  DashboardParams,
  { rejectValue: ApiError }
>('executiveDashboardClusterApi/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchClusterContractorBreakdownApi(params);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load cluster breakdown',
    });
  }
});

const executiveDashboardClusterApiSlice = createSlice({
  name: 'executiveDashboardClusterApi',
  initialState,
  reducers: { resetExecutiveDashboardCluster: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardCluster.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardCluster.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardCluster.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardCluster } =
  executiveDashboardClusterApiSlice.actions;
export default executiveDashboardClusterApiSlice.reducer;
