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
import alertsFeedApiReducer from './apiSlices/alertsFeedApiSlice';
import alertsUnreadCountApiReducer from './apiSlices/alertsUnreadCountApiSlice';
import approvedInspectionsApiReducer from './apiSlices/approvedInspectionsApiSlice';
import executiveDashboardLookupsApiReducer from './apiSlices/executiveDashboardLookupsApiSlice';
import executiveDashboardSummaryApiReducer from './apiSlices/executiveDashboardSummaryApiSlice';
import executiveDashboardComplianceApiReducer from './apiSlices/executiveDashboardComplianceApiSlice';
import executiveDashboardTrendApiReducer from './apiSlices/executiveDashboardTrendApiSlice';
import executiveDashboardClusterApiReducer from './apiSlices/executiveDashboardClusterApiSlice';
import executiveDashboardHeatmapApiReducer from './apiSlices/executiveDashboardHeatmapApiSlice';
import fleetComplianceKpiApiReducer from './apiSlices/fleetComplianceKpiApiSlice';
import fleetComplianceGovernorateApiReducer from './apiSlices/fleetComplianceGovernorateApiSlice';
import fleetComplianceInspectorApiReducer from './apiSlices/fleetComplianceInspectorApiSlice';
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
import operationInspectionsApiReducer from './apiSlices/operationInspectionsApiSlice';
import operationPermitRenewalsApiReducer from './apiSlices/operationPermitRenewalsApiSlice';
import operationsSummaryApiReducer from './apiSlices/operationsSummaryApiSlice';
import pendingUsersApiReducer from './apiSlices/pendingUsersApiSlice';
import permitSlaApiReducer from './apiSlices/permitSlaApiSlice';
import invoiceReportApiReducer from './apiSlices/invoiceReportApiSlice';
import paymentReportApiReducer from './apiSlices/paymentReportApiSlice';
import authReducer from './slices/authSlice';
import currentUserApiReducer from './apiSlices/currentUserApiSlice';

export const resetAllApiData = createAction('store/resetAllApiData');

const appReducer = combineReducers({
  activeUsersApi: activeUsersApiReducer,
  alertsFeedApi: alertsFeedApiReducer,
  alertsUnreadCountApi: alertsUnreadCountApiReducer,
  approvedInspectionsApi: approvedInspectionsApiReducer,
  executiveDashboardLookupsApi: executiveDashboardLookupsApiReducer,
  executiveDashboardSummaryApi: executiveDashboardSummaryApiReducer,
  executiveDashboardComplianceApi: executiveDashboardComplianceApiReducer,
  executiveDashboardTrendApi: executiveDashboardTrendApiReducer,
  executiveDashboardClusterApi: executiveDashboardClusterApiReducer,
  executiveDashboardHeatmapApi: executiveDashboardHeatmapApiReducer,
  fleetComplianceKpiApi: fleetComplianceKpiApiReducer,
  fleetComplianceGovernorateApi: fleetComplianceGovernorateApiReducer,
  fleetComplianceInspectorApi: fleetComplianceInspectorApiReducer,
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
  operationInspectionsApi: operationInspectionsApiReducer,
  operationPermitRenewalsApi: operationPermitRenewalsApiReducer,
  operationsSummaryApi: operationsSummaryApiReducer,
  pendingUsersApi: pendingUsersApiReducer,
  permitSlaApi: permitSlaApiReducer,
  invoiceReportApi: invoiceReportApiReducer,
  paymentReportApi: paymentReportApiReducer,
  auth: authReducer,
  currentUserApi: currentUserApiReducer,
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
