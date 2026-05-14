import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import activeUsersApiReducer from './apiSlices/activeUsersApiSlice';
import clustersApiReducer from './apiSlices/clustersApiSlice';
import clusterSetupApiReducer from './apiSlices/clusterSetupApiSlice';
import fleetRegistryApiReducer from './apiSlices/fleetRegistryApiSlice';
import fleetTargetsApiReducer from './apiSlices/fleetTargetsApiSlice';
import inspectionApiReducer from './apiSlices/inspectionApiSlice';
import inspectionDetailsApiReducer from './apiSlices/inspectionDetailsApiSlice';
import lookupsApiReducer from './apiSlices/lookupsApiSlice';
import pendingUsersApiReducer from './apiSlices/pendingUsersApiSlice';
// import sidebarApiReducer from './apiSlices/sidebarApiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    activeUsersApi: activeUsersApiReducer,
    clustersApi: clustersApiReducer,
    clusterSetupApi: clusterSetupApiReducer,
    fleetRegistryApi: fleetRegistryApiReducer,
    fleetTargetsApi: fleetTargetsApiReducer,
    inspectionApi: inspectionApiReducer,
    inspectionDetailsApi: inspectionDetailsApiReducer,
    lookupsApi: lookupsApiReducer,
    pendingUsersApi: pendingUsersApiReducer,
    // sidebarApi: sidebarApiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
