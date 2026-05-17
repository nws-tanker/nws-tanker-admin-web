import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveHeatmapApi } from '@/services/executiveDashboardService';
import type { DashboardQueryParams, Heatmap } from '@/types/dashboard';
import { type ApiError, type ApiState, States } from '../types';

type HeatmapState = ApiState<Heatmap>;

const initialState: HeatmapState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveHeatmap = createAsyncThunk<
  Heatmap,
  DashboardQueryParams,
  { rejectValue: ApiError }
>('executiveDashboardHeatmap/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveHeatmapApi(params);
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
  name: 'executiveDashboardHeatmap',
  initialState,
  reducers: {
    resetExecutiveHeatmap: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveHeatmap.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveHeatmap.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveHeatmap.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveHeatmap } =
  executiveDashboardHeatmapApiSlice.actions;
export default executiveDashboardHeatmapApiSlice.reducer;
