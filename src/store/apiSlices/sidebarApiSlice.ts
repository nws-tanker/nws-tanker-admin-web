// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { fetchSidebarApi } from '@/services/sidebarService';
// import type { SidebarData } from '@/types';

// import { type ApiError, type ApiState, States } from '../types';

// type SidebarApiState = ApiState<SidebarData>;

// const initialState: SidebarApiState = {
//   apiState: States.PRELOADING,
//   data: null,
//   error: null,
// };

// export const fetchSidebarData = createAsyncThunk<
//   SidebarData,
//   void,
//   { rejectValue: ApiError }
// >('sidebarApi/fetchSidebarData', async (_arg, { rejectWithValue }) => {
//   try {
//     const response = await fetchSidebarApi();
//     if (!response.success) return rejectWithValue(response.error);
//     return response.data;
//   } catch {
//     return rejectWithValue({
//       code: 'NETWORK_ERROR',
//       description: 'Unable to load sidebar data',
//     });
//   }
// });

// const sidebarApiSlice = createSlice({
//   name: 'sidebarApi',
//   initialState,
//   reducers: {
//     resetSidebar: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSidebarData.pending, (state) => {
//         state.apiState = States.LOADING;
//         state.error = null;
//       })
//       .addCase(fetchSidebarData.fulfilled, (state, action) => {
//         state.apiState = States.SUCCESS;
//         state.data = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchSidebarData.rejected, (state, action) => {
//         state.apiState = States.ERROR;
//         state.error = action.payload ?? {
//           code: 'UNKNOWN_ERROR',
//           description: 'Something went wrong',
//         };
//       });
//   },
// });

// export const { resetSidebar } = sidebarApiSlice.actions;
// export default sidebarApiSlice.reducer;
