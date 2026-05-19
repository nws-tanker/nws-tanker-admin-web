import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExecutiveDashboardLookupsApi } from '@/services/executiveDashboardService';
import type { ExecutiveDashboardLookupsResponse } from '@/types/executiveDashboard';
import { type ApiError, type ApiState, States } from '../types';

type State = ApiState<ExecutiveDashboardLookupsResponse>;

const initialState: State = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchExecutiveDashboardLookups = createAsyncThunk<
  ExecutiveDashboardLookupsResponse,
  void,
  { rejectValue: ApiError }
>('executiveDashboardLookupsApi/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchExecutiveDashboardLookupsApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load dashboard filters',
    });
  }
});

const executiveDashboardLookupsApiSlice = createSlice({
  name: 'executiveDashboardLookupsApi',
  initialState,
  reducers: { resetExecutiveDashboardLookups: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExecutiveDashboardLookups.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardLookups.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchExecutiveDashboardLookups.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetExecutiveDashboardLookups } =
  executiveDashboardLookupsApiSlice.actions;
export default executiveDashboardLookupsApiSlice.reducer;
