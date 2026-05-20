import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInvoiceReport } from '@/services/reportsService';
import type { InvoiceReportResponse } from '@/types';
import { type ApiError, type ApiState, States } from '../types';

type InvoiceReportApiSliceState = ApiState<InvoiceReportResponse>;

const initialState: InvoiceReportApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInvoiceReportThunk = createAsyncThunk<
  InvoiceReportResponse,
  void,
  { rejectValue: ApiError }
>('invoiceReportApi/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchInvoiceReport();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load invoice report',
    });
  }
});

const invoiceReportApiSlice = createSlice({
  name: 'invoiceReportApi',
  initialState,
  reducers: {
    resetInvoiceReport: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceReportThunk.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInvoiceReportThunk.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInvoiceReportThunk.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInvoiceReport } = invoiceReportApiSlice.actions;
export default invoiceReportApiSlice.reducer;
