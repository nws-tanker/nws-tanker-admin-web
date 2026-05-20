// nama/v1/api/executive-dashboard/summary
import type { SummaryResponse } from '@/types/executiveDashboard';

// Q1 — all on track (≥80%)
export const MOCK_SUMMARY_Q1: SummaryResponse = {
  fleet_details: { total_fleet: 4254, dw: 2480, sw: 1183, te: 591 },
  compliance: { threshold_percentage: 80, compliance_rate: 88 },
  inspection_pass: {
    pass_percentage: 93,
    rolling_date_duration: 30,
    change_ratio: 3.2,
  },
  lab_sla: { sla_percentage: 91, rolling_sla_duration: 30, change_ratio: 1.5 },
  expiry_tankers: { renewal_tankers: 210, expire_duration: 30 },
  permit_detail: {
    expired_permits: 180,
    cluster_name: 'Cluster 1',
    expired_cluster_count: 72,
    expired_fleet_percentage: 4.2,
  },
};

// Q2 — at risk (70–79%)
export const MOCK_SUMMARY_Q2: SummaryResponse = {
  fleet_details: { total_fleet: 4254, dw: 2480, sw: 1183, te: 591 },
  compliance: { threshold_percentage: 80, compliance_rate: 76 },
  inspection_pass: {
    pass_percentage: 89,
    rolling_date_duration: 30,
    change_ratio: 1.4,
  },
  lab_sla: { sla_percentage: 84, rolling_sla_duration: 30, change_ratio: -0.8 },
  expiry_tankers: { renewal_tankers: 381, expire_duration: 30 },
  permit_detail: {
    expired_permits: 440,
    cluster_name: 'Cluster 3',
    expired_cluster_count: 205,
    expired_fleet_percentage: 10.3,
  },
};

// Q3 — critical (<70%)
export const MOCK_SUMMARY_Q3: SummaryResponse = {
  fleet_details: { total_fleet: 4254, dw: 2480, sw: 1183, te: 591 },
  compliance: { threshold_percentage: 80, compliance_rate: 61 },
  inspection_pass: {
    pass_percentage: 74,
    rolling_date_duration: 30,
    change_ratio: -4.1,
  },
  lab_sla: { sla_percentage: 66, rolling_sla_duration: 30, change_ratio: -5.2 },
  expiry_tankers: { renewal_tankers: 620, expire_duration: 30 },
  permit_detail: {
    expired_permits: 810,
    cluster_name: 'Cluster 2',
    expired_cluster_count: 390,
    expired_fleet_percentage: 19.0,
  },
};

// Q4 — recovering, mixed
export const MOCK_SUMMARY_Q4: SummaryResponse = {
  fleet_details: { total_fleet: 4254, dw: 2480, sw: 1183, te: 591 },
  compliance: { threshold_percentage: 80, compliance_rate: 73 },
  inspection_pass: {
    pass_percentage: 81,
    rolling_date_duration: 30,
    change_ratio: 2.0,
  },
  lab_sla: { sla_percentage: 78, rolling_sla_duration: 30, change_ratio: 0.4 },
  expiry_tankers: { renewal_tankers: 490, expire_duration: 30 },
  permit_detail: {
    expired_permits: 560,
    cluster_name: 'Cluster 2',
    expired_cluster_count: 270,
    expired_fleet_percentage: 13.2,
  },
};

// Default — all quarters / full year view
export const MOCK_SUMMARY = MOCK_SUMMARY_Q2;
