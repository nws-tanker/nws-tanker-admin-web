import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPermitSlaApi } from '@/services/configurationService';
import type { PermitSlaApiResponse } from '@/types/configuration';
import { type ApiError, type ApiState, States } from '../types';

type PermitSlaApiSliceState = ApiState<PermitSlaApiResponse>;

const initialState: PermitSlaApiSliceState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchPermitSla = createAsyncThunk<
  PermitSlaApiResponse,
  void,
  { rejectValue: ApiError }
>('permitSlaApi/fetchPermitSla', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchPermitSlaApi();
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({
      code: 'NETWORK_ERROR',
      description: 'Unable to load permit & SLA rules',
    });
  }
});

const permitSlaApiSlice = createSlice({
  name: 'permitSlaApi',
  initialState,
  reducers: {
    resetPermitSla: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermitSla.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchPermitSla.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPermitSla.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetPermitSla } = permitSlaApiSlice.actions;
export default permitSlaApiSlice.reducer;
