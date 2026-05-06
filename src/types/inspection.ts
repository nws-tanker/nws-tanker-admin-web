export type InspectionTankerType = 'DW' | 'SW' | 'TE';

export type InspectionPriorStage =
  | 'pending_review'
  | 'pending_inspection'
  | 'lab_testing'
  | 'approved'
  | 'rejected';

export type InspectionRecord = {
  id: string;
  inspectionId: number;
  plate: string;
  tankerType: InspectionTankerType;
  governorate: string;
  cluster: string;
  inspectorName: string;
  submittedAt: string | null;
  priorStage: InspectionPriorStage;
  inspectionDate: string | null;
  scheduledDate: string | null;
  physicalDate: string | null;
  physicalScore: number | null;
  permitNumber: string | null;
  permitExpiresAt: string | null;
  rejectionReason: string | null;
  rejectionStage: string | null;
};

export type InspectionTab =
  | 'pending-review'
  | 'pending-inspection'
  | 'lab-testing'
  | 'approved'
  | 'rejected';

export type InspectionTabCounts = {
  pendingReview: number;
  pendingInspection: number;
  labTesting: number;
  approved: number;
  rejected: number;
};

export type InspectionScreenData = {
  counts: InspectionTabCounts;
  records: InspectionRecord[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

// ── Raw API response shapes (snake_case, as returned by the backend) ──

export type ApiInspectionRecord = {
  id: string;
  inspection_id: number;
  plate: string;
  tanker_type: string;
  governorate: string;
  cluster: string;
  inspector_name: string;
  submitted_at: string | null;
  prior_stage: string;
  inspection_date: string | null;
  scheduled_date: string | null;
  physical_date: string | null;
  physical_score: number | null;
  permit_number: string | null;
  permit_expires_at: string | null;
  rejection_reason: string | null;
  rejection_stage: string | null;
};

export type ApiInspectionPagedData = {
  counts: {
    pending_review: number;
    pending_inspection: number;
    lab_testing: number;
    approved: number;
    rejected: number;
  };
  data: ApiInspectionRecord[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};
