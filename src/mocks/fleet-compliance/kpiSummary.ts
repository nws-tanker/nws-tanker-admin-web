// /api/fleet-compliance/kpi-summary
import type { FleetComplianceKpiResponse } from '@/types/fleetCompliance';

export const MOCK_FLEET_COMPLIANCE_KPI: FleetComplianceKpiResponse = {
  total_fleet: {
    count: 4254,
    governorates: 11,
    clusters: 3,
  },
  valid_permits: {
    count: 3233,
    fleet_percentage: 76,
  },
  expired_permits: {
    count: 440,
    fleet_percentage: 10.3,
  },
  never_inspected: {
    count: 581,
    fleet_percentage: 13.7,
  },
  inspection_in_progress: {
    count: 47,
  },
  fleet_wide_compliance: {
    compliance_rate: 76,
    target: 80,
    change: {
      value: 2.1,
      vs_quarter: 'Q1',
    },
  },
};
