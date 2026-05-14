import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchInspectionDetails } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { type ApiError, type ApiState, States } from '../types';

type InspectionDetailsState = ApiState<InspectionDetailsApiResponse>;

const initialState: InspectionDetailsState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInspectionDetailsThunk = createAsyncThunk<
  InspectionDetailsApiResponse,
  string,
  { rejectValue: ApiError }
>('inspectionDetailsApi/fetch', async (inspectionId, { rejectWithValue }) => {
  try {
    const response = await fetchInspectionDetails(inspectionId);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load inspection details',
    });
  }
});

const inspectionDetailsApiSlice = createSlice({
  name: 'inspectionDetailsApi',
  initialState,
  reducers: {
    resetInspectionDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectionDetailsThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInspectionDetailsThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInspectionDetailsThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInspectionDetails } = inspectionDetailsApiSlice.actions;
export default inspectionDetailsApiSlice.reducer;
