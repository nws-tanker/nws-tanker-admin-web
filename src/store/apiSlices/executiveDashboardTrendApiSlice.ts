import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveTrendApi } from '@/services/executiveDashboardService';
import type { DashboardQueryParams, MonthlyTrend } from '@/types/dashboard';
import { type ApiError, type ApiState, States } from '../types';

type TrendState = ApiState<MonthlyTrend>;

const initialState: TrendState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveTrend = createAsyncThunk<
  MonthlyTrend,
  DashboardQueryParams,
  { rejectValue: ApiError }
>('executiveDashboardTrend/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveTrendApi(params);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load inspection trend',
    });
  }
});

const executiveDashboardTrendApiSlice = createSlice({
  name: 'executiveDashboardTrend',
  initialState,
  reducers: {
    resetExecutiveTrend: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveTrend.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveTrend.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveTrend.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveTrend } = executiveDashboardTrendApiSlice.actions;
export default executiveDashboardTrendApiSlice.reducer;
