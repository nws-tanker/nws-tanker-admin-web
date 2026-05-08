import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchFleetTargetsApi,
  saveFleetTargetsApi,
} from '@/services/fleetTargetsService';
import type {
  FleetTargetsApiResponse,
  SaveFleetTargetsRequest,
} from '@/types/configuration';
import { type ApiError, type ApiState, States } from '../types';

type FleetTargetsApiState = ApiState<FleetTargetsApiResponse> & {
  saveState: States;
  saveError: ApiError | null;
};

const initialState: FleetTargetsApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
  saveState: States.PRELOADING,
  saveError: null,
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

export const saveFleetTargets = createAsyncThunk<
  void,
  SaveFleetTargetsRequest,
  { rejectValue: ApiError }
>('fleetTargetsApi/saveFleetTargets', async (body, { rejectWithValue }) => {
  try {
    const response = await saveFleetTargetsApi(body);
    if (!response.success) return rejectWithValue(response.error);
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to save fleet targets',
    });
  }
});

const fleetTargetsApiSlice = createSlice({
  name: 'fleetTargetsApi',
  initialState,
  reducers: {
    resetFleetTargets: () => initialState,
    resetSaveState: (state) => {
      state.saveState = States.PRELOADING;
      state.saveError = null;
    },
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
      })
      .addCase(saveFleetTargets.pending, (state) => {
        state.saveState = States.LOADING;
        state.saveError = null;
      })
      .addCase(saveFleetTargets.fulfilled, (state) => {
        state.saveState = States.SUCCESS;
        state.saveError = null;
      })
      .addCase(saveFleetTargets.rejected, (state, action) => {
        state.saveState = States.ERROR;
        state.saveError = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetFleetTargets, resetSaveState } =
  fleetTargetsApiSlice.actions;
export default fleetTargetsApiSlice.reducer;
