import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { fetchFleetTankersApi } from '@/services/fleetRegistryService';
import type { Assignment, Tanker } from '@/types';

import { type ApiError, type ApiState, States } from '../types';

type FleetRegistryApiState = ApiState<Tanker[]>;

const initialState: FleetRegistryApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchFleetTankers = createAsyncThunk<
  Tanker[],
  void,
  { rejectValue: ApiError }
>('fleetRegistryApi/fetchFleetTankers', async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetchFleetTankersApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load fleet registry',
    });
  }
});

type SetTankerAssignmentPayload = {
  tankerId: string;
  assignment: Assignment | null;
};

const fleetRegistryApiSlice = createSlice({
  name: 'fleetRegistryApi',
  initialState,
  reducers: {
    resetFleetRegistry: () => initialState,
    setTankerAssignment: (
      state,
      action: PayloadAction<SetTankerAssignmentPayload>,
    ) => {
      const tanker = state.data?.find((t) => t.id === action.payload.tankerId);
      if (tanker) tanker.assignment = action.payload.assignment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFleetTankers.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchFleetTankers.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFleetTankers.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetFleetRegistry, setTankerAssignment } =
  fleetRegistryApiSlice.actions;
export default fleetRegistryApiSlice.reducer;
