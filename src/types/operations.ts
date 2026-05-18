export interface OperationsFleet {
  total: number;
  drinking_water: number;
  sewage_water: number;
  treated_effluent: number;
}

export interface OperationsCompliance {
  pass_rate: number;
  lab_sla_rate: number;
  lab_overdue_count: number;
}

export interface OperationsPermits {
  valid_count: number;
  expired_count: number;
  pending_review_count: number;
  expiring_within_30_days: number;
}

export interface OperationsSummary {
  date: string;
  inspections_submitted_today: number;
  fleet: OperationsFleet;
  compliance: OperationsCompliance;
  permits: OperationsPermits;
}

export interface OperationInspectionItem {
  inspection_id: string;
  plate: string;
  tanker_type: string;
  governorate: string;
  inspector_name: string;
  submitted_at: string;
  status: string;
}

export interface OperationInspectionsResponse {
  total_elements: number;
  items: OperationInspectionItem[];
}

export interface OperationPermitRenewalItem {
  plate: string;
  tanker_type: string;
  owner_name: string;
  permit_number: string;
  expires_at: string;
}

export interface OperationPermitRenewalsResponse {
  total_elements: number;
  items: OperationPermitRenewalItem[];
}
