import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchInspectionReviewApi,
  type InspectionApiParams,
} from '@/services/inspectionService';
import type { ApiInspectionPagedData } from '@/types/inspection';

import { type ApiError, type ApiState, States } from '../types';

type InspectionApiState = ApiState<ApiInspectionPagedData>;

const initialState: InspectionApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInspectionReview = createAsyncThunk<
  ApiInspectionPagedData,
  InspectionApiParams,
  { rejectValue: ApiError }
>(
  'inspectionApi/fetchInspectionReview',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchInspectionReviewApi(params);
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load inspection data',
      });
    }
  },
);

const inspectionApiSlice = createSlice({
  name: 'inspectionApi',
  initialState,
  reducers: {
    resetInspection: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectionReview.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInspectionReview.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInspectionReview.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInspection } = inspectionApiSlice.actions;
export default inspectionApiSlice.reducer;
