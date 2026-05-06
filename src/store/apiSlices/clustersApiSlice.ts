import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchClusters } from '@/services/configurationService';
import type { ClusterResponse } from '@/types';

import { type ApiError, type ApiState, States } from '../types';

type ClustersApiState = ApiState<ClusterResponse[]>;

const initialState: ClustersApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchClustersThunk = createAsyncThunk<
  ClusterResponse[],
  void,
  { rejectValue: ApiError }
>('clustersApi/fetchClusters', async (_arg, { rejectWithValue }) => {
  try {
    const response = await fetchClusters();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load clusters',
    });
  }
});

const clustersApiSlice = createSlice({
  name: 'clustersApi',
  initialState,
  reducers: {
    resetClusters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClustersThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchClustersThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchClustersThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetClusters } = clustersApiSlice.actions;
export default clustersApiSlice.reducer;
