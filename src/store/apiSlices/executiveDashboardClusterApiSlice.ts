import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveClustersApi } from '@/services/executiveDashboardService';
import type { ClusterBreakdown, DashboardQueryParams } from '@/types/dashboard';
import { type ApiError, type ApiState, States } from '../types';

type ClusterState = ApiState<ClusterBreakdown>;

const initialState: ClusterState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveClusters = createAsyncThunk<
  ClusterBreakdown,
  DashboardQueryParams,
  { rejectValue: ApiError }
>('executiveDashboardCluster/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveClustersApi(params);
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
  name: 'executiveDashboardCluster',
  initialState,
  reducers: {
    resetExecutiveClusters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveClusters.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveClusters.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveClusters.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveClusters } =
  executiveDashboardClusterApiSlice.actions;
export default executiveDashboardClusterApiSlice.reducer;
