// nama/v1/api/executive-dashboard/compliance-by-tanker-type
import type { ComplianceByTankerTypeResponse } from '@/types/executiveDashboard';

// Cluster 1 — all on track (≥80%)
export const MOCK_COMPLIANCE_CLUSTER_1: ComplianceByTankerTypeResponse = {
  dw: {
    target: 980,
    valid: 882,
    expired: 52,
    no_permit: 46,
    never_inspected: 46,
    tanker_health_percentage: 90,
  },
  sw: {
    target: 460,
    valid: 391,
    expired: 38,
    no_permit: 31,
    never_inspected: 31,
    tanker_health_percentage: 85,
  },
  te: {
    target: 220,
    valid: 185,
    expired: 20,
    no_permit: 15,
    never_inspected: 15,
    tanker_health_percentage: 84,
  },
};

// Cluster 2 — mixed (DW on track, SW at risk, TE critical)
export const MOCK_COMPLIANCE_CLUSTER_2: ComplianceByTankerTypeResponse = {
  dw: {
    target: 840,
    valid: 714,
    expired: 72,
    no_permit: 54,
    never_inspected: 54,
    tanker_health_percentage: 85,
  },
  sw: {
    target: 390,
    valid: 289,
    expired: 58,
    no_permit: 43,
    never_inspected: 43,
    tanker_health_percentage: 74,
  },
  te: {
    target: 185,
    valid: 111,
    expired: 40,
    no_permit: 34,
    never_inspected: 34,
    tanker_health_percentage: 60,
  },
};

// Cluster 3 — all critical (<70%)
export const MOCK_COMPLIANCE_CLUSTER_3: ComplianceByTankerTypeResponse = {
  dw: {
    target: 660,
    valid: 389,
    expired: 132,
    no_permit: 139,
    never_inspected: 139,
    tanker_health_percentage: 59,
  },
  sw: {
    target: 333,
    valid: 172,
    expired: 94,
    no_permit: 67,
    never_inspected: 67,
    tanker_health_percentage: 52,
  },
  te: {
    target: 186,
    valid: 100,
    expired: 48,
    no_permit: 38,
    never_inspected: 38,
    tanker_health_percentage: 54,
  },
};

// Default — all clusters, fleet-wide (DW on track, SW at risk, TE critical)
export const MOCK_COMPLIANCE_BY_TANKER_TYPE: ComplianceByTankerTypeResponse = {
  dw: {
    target: 2480,
    valid: 1985,
    expired: 256,
    no_permit: 239,
    never_inspected: 239,
    tanker_health_percentage: 80,
  },
  sw: {
    target: 1183,
    valid: 852,
    expired: 122,
    no_permit: 209,
    never_inspected: 209,
    tanker_health_percentage: 72,
  },
  te: {
    target: 591,
    valid: 396,
    expired: 62,
    no_permit: 133,
    never_inspected: 133,
    tanker_health_percentage: 67,
  },
};
