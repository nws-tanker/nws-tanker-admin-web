export type GovernorateComplianceRow = {
  governorate: string;
  cluster: string;
  total_fleet: number;
  valid_permit: number;
  in_progress?: number;
  expired: number;
  never_inspected: number;
  compliance_rate: number;
};

export type GovernorateComplianceResponse = {
  rows: GovernorateComplianceRow[];
};

export type InspectorPerformanceRow = {
  inspector_name: string;
  cluster: string;
  inspected: number;
  rejected: number;
  permits_issued: number;
  compliance_rate: number;
};

export type InspectorPerformanceResponse = {
  total_inspectors: number;
  rows: InspectorPerformanceRow[];
};

export type FleetComplianceParams = {
  fiscal_years: number[];
  clusters: number[];
  governorates: number[];
};

export type FleetComplianceKpiResponse = {
  total_fleet: {
    count: number;
    governorates: number;
    clusters: number;
  };
  valid_permits: {
    count: number;
    fleet_percentage: number;
  };
  expired_permits: {
    count: number;
    fleet_percentage: number;
  };
  never_inspected: {
    count: number;
    fleet_percentage: number;
  };
  inspection_in_progress: {
    count: number;
  };
  fleet_wide_compliance: {
    compliance_rate: number;
    target: number;
    change: {
      value: number; // positive = improvement, negative = decline
      vs_quarter: string;
    };
  };
};
