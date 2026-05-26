import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApprovedInspectionsApi } from '@/services/permitRegenerationService';
import type {
  ApprovedInspectionsParams,
  ApprovedInspectionsResponse,
} from '@/types/permitRegeneration';
import { type ApiError, type ApiState, States } from '../types';

type ApprovedInspectionsApiState = ApiState<ApprovedInspectionsResponse>;

const initialState: ApprovedInspectionsApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchApprovedInspections = createAsyncThunk<
  ApprovedInspectionsResponse,
  ApprovedInspectionsParams,
  { rejectValue: ApiError }
>(
  'approvedInspectionsApi/fetchApprovedInspections',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetchApprovedInspectionsApi(arg);
      if (!response.success) return rejectWithValue(response.error);
      return response.data;
    } catch {
      return rejectWithValue({
        code: 'NETWORK_ERROR',
        description: 'Unable to load approved inspections',
      });
    }
  },
);

const approvedInspectionsApiSlice = createSlice({
  name: 'approvedInspectionsApi',
  initialState,
  reducers: {
    resetApprovedInspections: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedInspections.pending, (state) => {
        state.apiState = States.LOADING;
        state.error = null;
      })
      .addCase(fetchApprovedInspections.fulfilled, (state, action) => {
        state.apiState = States.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchApprovedInspections.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? {
          code: 'UNKNOWN_ERROR',
          description: 'Something went wrong',
        };
      });
  },
});

export const { resetApprovedInspections } = approvedInspectionsApiSlice.actions;
export default approvedInspectionsApiSlice.reducer;
