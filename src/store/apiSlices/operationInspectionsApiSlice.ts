import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOperationInspections } from '@/services/operationServices';
import type { OperationInspectionsResponse } from '@/types';
import { type ApiError, type ApiState, States } from '../types';

type OperationInspectionsApiSliceState = ApiState<OperationInspectionsResponse>;

const initialState: OperationInspectionsApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchOperationInspectionsThunk = createAsyncThunk<
  OperationInspectionsResponse,
  number,
  { rejectValue: ApiError }
>(
  'operationInspectionsApi/fetchOperationInspections',
  async (limit, { rejectWithValue }) => {
    try {
      const response = await fetchOperationInspections(limit);
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load operation inspections',
      });
    }
  },
);

const operationInspectionsApiSlice = createSlice({
  name: 'operationInspectionsApi',
  initialState,
  reducers: {
    resetOperationInspections: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperationInspectionsThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchOperationInspectionsThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOperationInspectionsThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetOperationInspections } =
  operationInspectionsApiSlice.actions;
export default operationInspectionsApiSlice.reducer;
