import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFleetTargetsApi } from '@/services/fleetTargetsService';
import type { FleetTargetsApiResponse } from '@/types/configuration';
import { type ApiError, type ApiState, States } from '../types';

type FleetTargetsApiState = ApiState<FleetTargetsApiResponse>;

const initialState: FleetTargetsApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchFleetTargets = createAsyncThunk<
  FleetTargetsApiResponse,
  void,
  { rejectValue: ApiError }
>('fleetTargetsApi/fetchFleetTargets', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchFleetTargetsApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load fleet targets',
    });
  }
});

const fleetTargetsApiSlice = createSlice({
  name: 'fleetTargetsApi',
  initialState,
  reducers: {
    resetFleetTargets: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFleetTargets.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchFleetTargets.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFleetTargets.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetFleetTargets } = fleetTargetsApiSlice.actions;
export default fleetTargetsApiSlice.reducer;
