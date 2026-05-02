import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import fleetRegistryApiReducer from './apiSlices/fleetRegistryApiSlice';
import lookupsApiReducer from './apiSlices/lookupsApiSlice';
import sidebarApiReducer from './apiSlices/sidebarApiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    fleetRegistryApi: fleetRegistryApiReducer,
    lookupsApi: lookupsApiReducer,
    sidebarApi: sidebarApiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
