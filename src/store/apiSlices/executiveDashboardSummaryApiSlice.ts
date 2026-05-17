import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveSummaryApi } from '@/services/executiveDashboardService';
import type { DashboardQueryParams, ExecutiveSummary } from '@/types/dashboard';
import { type ApiError, type ApiState, States } from '../types';

type SummaryState = ApiState<ExecutiveSummary>;

const initialState: SummaryState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveSummary = createAsyncThunk<
  ExecutiveSummary,
  DashboardQueryParams,
  { rejectValue: ApiError }
>('executiveDashboardSummary/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveSummaryApi(params);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load dashboard summary',
    });
  }
});

const executiveDashboardSummaryApiSlice = createSlice({
  name: 'executiveDashboardSummary',
  initialState,
  reducers: {
    resetExecutiveSummary: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveSummary.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveSummary.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveSummary.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveSummary } =
  executiveDashboardSummaryApiSlice.actions;
export default executiveDashboardSummaryApiSlice.reducer;
