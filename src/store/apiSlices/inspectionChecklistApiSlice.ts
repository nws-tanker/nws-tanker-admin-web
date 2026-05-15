import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInspectionChecklist as fetchInspectionChecklistApi } from '@/services/configurationService';
import { type ApiError, type ApiState, States } from '../types';
import type { InspectionChecklistResponse } from '@/types/configuration';

type InspectionChecklistApiState = ApiState<InspectionChecklistResponse>;

const initialState: InspectionChecklistApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchInspectionChecklist = createAsyncThunk<
  InspectionChecklistResponse,
  void,
  { rejectValue: ApiError }
>(
  'inspectionChecklistApi/fetchInspectionChecklist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchInspectionChecklistApi();
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load inspection checklist',
      });
    }
  },
);

const inspectionChecklistApiSlice = createSlice({
  name: 'inspectionChecklistApi',
  initialState,
  reducers: {
    resetInspectionChecklist: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectionChecklist.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchInspectionChecklist.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchInspectionChecklist.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetInspectionChecklist } = inspectionChecklistApiSlice.actions;
export default inspectionChecklistApiSlice.reducer;
