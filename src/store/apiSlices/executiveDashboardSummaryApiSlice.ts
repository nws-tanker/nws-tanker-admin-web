import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveDashboardSummaryApi } from '@/services/executiveDashboardService';
import type {
  DashboardParams,
  SummaryResponse,
} from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<SummaryResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardSummary = createAsyncThunk<
  SummaryResponse,
  DashboardParams,
  { rejectValue: ApiError }
>('executiveDashboardSummaryApi/fetch', async (params, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveDashboardSummaryApi(params);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load summary',
    });
  }
});

const executiveDashboardSummaryApiSlice = createSlice({
  name: 'executiveDashboardSummaryApi',
  initialState,
  reducers: { resetExecutiveDashboardSummary: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardSummary.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardSummary.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardSummary.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardSummary } =
  executiveDashboardSummaryApiSlice.actions;
export default executiveDashboardSummaryApiSlice.reducer;
