import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMonthlyInspectionTrendApi } from '@/services/executiveDashboardService';
import type {
  DashboardParams,
  MonthlyInspectionTrendResponse,
} from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<MonthlyInspectionTrendResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardTrend = createAsyncThunk<
  MonthlyInspectionTrendResponse,
  DashboardParams,
  { rejectValue: ApiError }
>('executiveDashboardTrendApi/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchMonthlyInspectionTrendApi(params);
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
  name: 'executiveDashboardTrendApi',
  initialState,
  reducers: { resetExecutiveDashboardTrend: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardTrend.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardTrend.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardTrend.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardTrend } =
  executiveDashboardTrendApiSlice.actions;
export default executiveDashboardTrendApiSlice.reducer;
