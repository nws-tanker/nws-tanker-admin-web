export type RagStatus = 'on_track' | 'at_risk' | 'critical';

export type DashboardFilters = {
  quarter: string;
  clusterId: number | null;
};

export type FleetByType = {
  dw: number;
  sw: number;
  te: number;
};

export type ExecutiveKpis = {
  totalFleet: number;
  fleetByType: FleetByType;
  complianceRate: number;
  complianceTarget: number;
  inspectionPassRate: number;
  labSlaAdherence: number;
  expiringIn30Days: number;
  expiredPermits: number;
  expiredPermitsCriticalCluster: number;
};

export type ComplianceByType = {
  type: 'DW' | 'SW' | 'TE';
  target: number;
  valid: number;
  expired: number;
  noPermit: number;
  complianceRate: number;
  status: RagStatus;
};

export type ExecutiveSummary = {
  refreshedAt: string;
  filters: DashboardFilters;
  kpis: ExecutiveKpis;
  byType: ComplianceByType[];
};

export type MonthlyTrendPoint = {
  month: string;
  approved: number;
  rejected: number;
  labPending: number;
};

export type MonthlyTrend = {
  windowStart: string;
  windowEnd: string;
  points: MonthlyTrendPoint[];
  totals: { approved: number; rejected: number; labPending: number };
};

export type ClusterBreakdownRow = {
  clusterId: number;
  clusterName: string;
  contractorName: string;
  governorates: string[];
  fleet: number;
  dw: number;
  sw: number;
  te: number;
  valid: number;
  expired: number;
  expiring30: number;
  passRate: number;
  slaRate: number;
  labCount: number;
  complianceRate: number;
  status: RagStatus;
};

export type ClusterBreakdownTotals = {
  fleet: number;
  dw: number;
  sw: number;
  te: number;
  valid: number;
  expired: number;
  expiring30: number;
  passRate: number;
  slaRate: number;
  labCount: number;
  complianceRate: number;
};

export type ClusterBreakdown = {
  rows: ClusterBreakdownRow[];
  totals: ClusterBreakdownTotals;
};

export type HeatmapCell = {
  governorate: string;
  value: number | null;
};

export type HeatmapRow = {
  type: 'DW' | 'SW' | 'TE';
  cells: HeatmapCell[];
  avg: number | null;
};

export type HeatmapColumnAverage = {
  governorate: string;
  value: number | null;
};

export type Heatmap = {
  governorates: string[];
  rows: HeatmapRow[];
  columnAverages: HeatmapColumnAverage[];
};

export type DashboardQueryParams = {
  quarter?: string;
  clusterId?: number | null;
};
