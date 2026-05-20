import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFleetComplianceKpi } from '@/store/apiSlices/fleetComplianceKpiApiSlice';
import { fetchGovernorateCompliance } from '@/store/apiSlices/fleetComplianceGovernorateApiSlice';
import { fetchInspectorPerformance } from '@/store/apiSlices/fleetComplianceInspectorApiSlice';
import {
  fetchExecutiveDashboardCompliance,
  resetExecutiveDashboardCompliance,
} from '@/store/apiSlices/executiveDashboardComplianceApiSlice';
import type { FleetComplianceParams } from '@/types/fleetCompliance';
import type { DashboardParams } from '@/types/executiveDashboard';

export function useFleetComplianceData() {
  const dispatch = useAppDispatch();

  const kpiState = useAppSelector((s) => s.fleetComplianceKpiApi);
  const governorateState = useAppSelector(
    (s) => s.fleetComplianceGovernorateApi,
  );
  const inspectorState = useAppSelector((s) => s.fleetComplianceInspectorApi);
  const tankerTypeState = useAppSelector(
    (s) => s.executiveDashboardComplianceApi,
  );

  useEffect(() => {
    return () => {
      dispatch(resetExecutiveDashboardCompliance());
    };
  }, [dispatch]);

  const fetchFleetData = useCallback(
    (fleet: FleetComplianceParams, tankerType: DashboardParams) => {
      dispatch(fetchFleetComplianceKpi(fleet));
      dispatch(fetchGovernorateCompliance(fleet));
      dispatch(fetchInspectorPerformance(fleet));
      dispatch(fetchExecutiveDashboardCompliance(tankerType));
    },
    [dispatch],
  );

  return {
    kpiState,
    governorateState,
    inspectorState,
    tankerTypeState,
    fetchFleetData,
  };
}
