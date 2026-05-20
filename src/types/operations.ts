import type { InspectionTankerType } from './inspection';

export type OperationsFleet = {
  total: number;
  drinking_water: number;
  sewage_water: number;
  treated_effluent: number;
};

export type OperationsCompliance = {
  pass_rate: number;
  lab_sla_rate: number;
  lab_overdue_count: number;
};

export type OperationsPermits = {
  valid_count: number;
  expired_count: number;
  pending_review_count: number;
  expiring_within_30_days: number;
};

export type OperationsSummary = {
  date: string;
  inspections_submitted_today: number;
  fleet: OperationsFleet;
  compliance: OperationsCompliance;
  permits: OperationsPermits;
};

export type OperationInspectionItem = {
  inspection_id: string;
  plate: string;
  tanker_type: InspectionTankerType;
  governorate: string;
  inspector_name: string;
  submitted_at: string;
  status: string;
};

export type OperationInspectionsResponse = {
  total_elements: number;
  items: OperationInspectionItem[];
};

export type OperationPermitRenewalItem = {
  plate: string;
  tanker_type: InspectionTankerType;
  owner_name: string;
  permit_number: string;
  expires_at: string;
};

export type OperationPermitRenewalsResponse = {
  total_elements: number;
  urgent_count: number;
  items: OperationPermitRenewalItem[];
};
