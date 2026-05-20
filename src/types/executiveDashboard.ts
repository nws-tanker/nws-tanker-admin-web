import type { Cluster, FiscalYear, FiscalYearBound, Quarter } from './lookups';

export type { FiscalYear, FiscalYearBound, Quarter };

// ─── Filter params sent as query strings to all dashboard APIs ───────────────

export type DashboardParams = {
  fiscal_years: number[];
  quarters: ('Q1' | 'Q2' | 'Q3' | 'Q4')[];
  clusters: number[];
  governorates: number[];
};

// ─── Executive Dashboard Lookups ─────────────────────────────────────────────

export type ExecutiveDashboardLookupsResponse = {
  fiscal_year: FiscalYear[];
  quarters: Quarter[];
  clusters: Cluster[];
};

// ─── Summary ─────────────────────────────────────────────────────────────────

export type SummaryResponse = {
  fleet_details: {
    total_fleet: number;
    dw: number;
    sw: number;
    te: number;
  };
  compliance: {
    threshold_percentage: number;
    compliance_rate: number;
  };
  inspection_pass: {
    pass_percentage: number;
    rolling_date_duration: number;
    change_ratio: number; // positive = increase, negative = decrease
  };
  lab_sla: {
    sla_percentage: number;
    rolling_sla_duration: number;
    change_ratio: number;
  };
  expiry_tankers: {
    renewal_tankers: number;
    expire_duration: number;
  };
  permit_detail: {
    expired_permits: number;
    cluster_name: string;
    expired_cluster_count: number;
    expired_fleet_percentage: number;
  };
};

// ─── Compliance by Tanker Type ────────────────────────────────────────────────

export type TankerTypeCompliance = {
  target: number;
  valid: number;
  expired: number;
  no_permit: number;
  never_inspected: number;
  tanker_health_percentage: number; // valid / target
};

export type ComplianceByTankerTypeResponse = {
  dw: TankerTypeCompliance;
  sw: TankerTypeCompliance;
  te: TankerTypeCompliance;
};

// ─── Monthly Inspection Trend ─────────────────────────────────────────────────

export type MonthlyInspectionSeries = {
  month: string;
  approved: number;
  rejected: number;
  lab_pending: number;
};

export type InspectionTotals = {
  approved: number;
  rejected: number;
  lab_pending: number;
};

export type MonthlyInspectionTrendResponse = {
  series: MonthlyInspectionSeries[];
  totals: InspectionTotals;
  y_axis: number[];
};

// ─── Cluster & Contractor Breakdown ──────────────────────────────────────────

export type ClusterMetrics = {
  fleet: number;
  dw: number;
  sw: number;
  te: number;
  valid: number;
  expired: number;
  renewal_tankers: number;
  pass_percentage: number;
  sla_percentage: number;
  lab: number;
  compliance: number;
};

export type ClusterDetail = ClusterMetrics & {
  cluster_name: string;
  contractor_name: string;
  governorates: string[];
};

export type ClusterContractorBreakdownResponse = {
  cluster_details: ClusterDetail[];
  total_details: ClusterMetrics;
  contractor_count: number;
  governorate_count: number;
};

// ─── Compliance Heatmap ───────────────────────────────────────────────────────

export type HeatmapCell = {
  governorate: string;
  percentage: number | null;
};

export type HeatmapRow = {
  row: 'dw' | 'sw' | 'te';
  values: HeatmapCell[];
  average: number;
};

export type GovernorateAverage = {
  governorate: string;
  percentage: number;
};

export type ComplianceHeatmapResponse = {
  x_axis: string[];
  y_axis: ('dw' | 'sw' | 'te')[];
  data: HeatmapRow[];
  final_average: GovernorateAverage[];
  overall_average: number;
};
