import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOperationsSummary } from '@/services/operationServices';
import type { OperationsSummary } from '@/types';
import { type ApiError, type ApiState, States } from '../types';

type OperationsSummaryApiSliceState = ApiState<OperationsSummary>;

const initialState: OperationsSummaryApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchOperationsSummaryThunk = createAsyncThunk<
  OperationsSummary,
  void,
  { rejectValue: ApiError }
>(
  'operationsSummaryApi/fetchOperationsSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOperationsSummary();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load operations summary',
      });
    }
  },
);

const operationsSummaryApiSlice = createSlice({
  name: 'operationsSummaryApi',
  initialState,
  reducers: {
    resetOperationsSummary: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperationsSummaryThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchOperationsSummaryThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOperationsSummaryThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetOperationsSummary } = operationsSummaryApiSlice.actions;
export default operationsSummaryApiSlice.reducer;
