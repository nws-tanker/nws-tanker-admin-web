import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPaymentReport } from '@/services/reportsService';
import type { PaymentReportResponse } from '@/types';
import { type ApiError, type ApiState, States } from '../types';

type PaymentReportApiSliceState = ApiState<PaymentReportResponse>;

const initialState: PaymentReportApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchPaymentReportThunk = createAsyncThunk<
  PaymentReportResponse,
  void,
  { rejectValue: ApiError }
>('paymentReportApi/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchPaymentReport();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load payment report',
    });
  }
});

const paymentReportApiSlice = createSlice({
  name: 'paymentReportApi',
  initialState,
  reducers: {
    resetPaymentReport: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentReportThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchPaymentReportThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPaymentReportThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetPaymentReport } = paymentReportApiSlice.actions;
export default paymentReportApiSlice.reducer;
