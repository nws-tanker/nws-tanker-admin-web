import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import activeUsersApiReducer from './apiSlices/activeUsersApiSlice';
import executiveDashboardLookupsApiReducer from './apiSlices/executiveDashboardLookupsApiSlice';
import executiveDashboardSummaryApiReducer from './apiSlices/executiveDashboardSummaryApiSlice';
import executiveDashboardComplianceApiReducer from './apiSlices/executiveDashboardComplianceApiSlice';
import executiveDashboardTrendApiReducer from './apiSlices/executiveDashboardTrendApiSlice';
import executiveDashboardClusterApiReducer from './apiSlices/executiveDashboardClusterApiSlice';
import executiveDashboardHeatmapApiReducer from './apiSlices/executiveDashboardHeatmapApiSlice';
import clustersApiReducer from './apiSlices/clustersApiSlice';
import clusterSetupApiReducer from './apiSlices/clusterSetupApiSlice';
import fleetRegistryApiReducer from './apiSlices/fleetRegistryApiSlice';
import fleetTargetsApiReducer from './apiSlices/fleetTargetsApiSlice';
import inspectionApiReducer from './apiSlices/inspectionApiSlice';
import inspectionChecklistApiReducer from './apiSlices/inspectionChecklistApiSlice';
import inspectionDetailsApiReducer from './apiSlices/inspectionDetailsApiSlice';
import inspectorDashboardApiReducer from './apiSlices/inspectorDashboardApiSlice';
import lookupsApiReducer from './apiSlices/lookupsApiSlice';
import notificationContactsApiReducer from './apiSlices/notificationContactsApiSlice';
import pendingUsersApiReducer from './apiSlices/pendingUsersApiSlice';
import permitSlaApiReducer from './apiSlices/permitSlaApiSlice';
// import sidebarApiReducer from './apiSlices/sidebarApiSlice';
import authReducer from './slices/authSlice';

export const resetAllApiData = createAction('store/resetAllApiData');

const appReducer = combineReducers({
  activeUsersApi: activeUsersApiReducer,
  executiveDashboardLookupsApi: executiveDashboardLookupsApiReducer,
  executiveDashboardSummaryApi: executiveDashboardSummaryApiReducer,
  executiveDashboardComplianceApi: executiveDashboardComplianceApiReducer,
  executiveDashboardTrendApi: executiveDashboardTrendApiReducer,
  executiveDashboardClusterApi: executiveDashboardClusterApiReducer,
  executiveDashboardHeatmapApi: executiveDashboardHeatmapApiReducer,
  clustersApi: clustersApiReducer,
  clusterSetupApi: clusterSetupApiReducer,
  fleetRegistryApi: fleetRegistryApiReducer,
  fleetTargetsApi: fleetTargetsApiReducer,
  inspectionApi: inspectionApiReducer,
  inspectionChecklistApi: inspectionChecklistApiReducer,
  inspectionDetailsApi: inspectionDetailsApiReducer,
  inspectorDashboardApi: inspectorDashboardApiReducer,
  lookupsApi: lookupsApiReducer,
  notificationContactsApi: notificationContactsApiReducer,
  pendingUsersApi: pendingUsersApiReducer,
  permitSlaApi: permitSlaApiReducer,
  // sidebarApi: sidebarApiReducer,
  auth: authReducer,
});

type AppState = ReturnType<typeof appReducer>;

function rootReducer(state: AppState | undefined, action: { type: string }) {
  if (action.type === resetAllApiData.type) {
    return appReducer({ auth: state!.auth } as AppState, action);
  }
  return appReducer(state, action);
}

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
