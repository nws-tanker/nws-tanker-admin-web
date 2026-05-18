import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOperationPermitRenewals } from '@/services/operationServices';
import type { OperationPermitRenewalsResponse } from '@/types';
import { type ApiError, type ApiState, States } from '../types';

type OperationPermitRenewalsApiSliceState =
  ApiState<OperationPermitRenewalsResponse>;

const initialState: OperationPermitRenewalsApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchOperationPermitRenewalsThunk = createAsyncThunk<
  OperationPermitRenewalsResponse,
  number,
  { rejectValue: ApiError }
>(
  'operationPermitRenewalsApi/fetchOperationPermitRenewals',
  async (limit, { rejectWithValue }) => {
    try {
      const response = await fetchOperationPermitRenewals(limit);
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load permit renewals',
      });
    }
  },
);

const operationPermitRenewalsApiSlice = createSlice({
  name: 'operationPermitRenewalsApi',
  initialState,
  reducers: {
    resetOperationPermitRenewals: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperationPermitRenewalsThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchOperationPermitRenewalsThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOperationPermitRenewalsThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetOperationPermitRenewals } =
  operationPermitRenewalsApiSlice.actions;
export default operationPermitRenewalsApiSlice.reducer;
