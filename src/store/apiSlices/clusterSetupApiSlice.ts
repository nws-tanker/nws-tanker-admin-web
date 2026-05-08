import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchClusterSetupApi } from '@/services/configurationService';
import type { ClusterSetupApiResponse } from '@/types/configuration';
import { type ApiError, type ApiState, States } from '../types';

type ClusterSetupApiState = ApiState<ClusterSetupApiResponse>;

const initialState: ClusterSetupApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchClusterSetup = createAsyncThunk<
  ClusterSetupApiResponse,
  void,
  { rejectValue: ApiError }
>('clusterSetupApi/fetchClusterSetup', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchClusterSetupApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load cluster setup',
    });
  }
});

const clusterSetupApiSlice = createSlice({
  name: 'clusterSetupApi',
  initialState,
  reducers: {
    resetClusterSetup: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClusterSetup.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchClusterSetup.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClusterSetup.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetClusterSetup } = clusterSetupApiSlice.actions;
export default clusterSetupApiSlice.reducer;
