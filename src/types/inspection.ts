export const INSPECTION_TANKER_TYPE = {
  DW: 'DW',
  SW: 'SW',
  TE: 'TE',
} as const;

export type InspectionTankerType =
  (typeof INSPECTION_TANKER_TYPE)[keyof typeof INSPECTION_TANKER_TYPE];

export type InspectionTab =
  | 'pending-review'
  | 'pending-inspection'
  | 'submitted'
  | 'lab-testing'
  | 'approved'
  | 'rejected';

export type InspectionTabCounts = {
  in_review: number;
  pending: number;
  submitted: number;
  lab_pending: number;
  approved: number;
  rejected: number;
};

export const INSPECTION_TAB_API_PARAM: Record<InspectionTab, string> = {
  'pending-review': 'in_review',
  'pending-inspection': 'pending',
  submitted: 'submitted',
  'lab-testing': 'lab_pending',
  approved: 'approved',
  rejected: 'rejected',
};

export const INSPECTION_STATUS_LABEL: Record<string, string> = {
  submitted: 'Inspection Submitted',
  in_review: 'Pending Review',
  pending: 'Pending Inspection',
  lab_pending: 'Lab Testing',
  approved: 'Approved',
  rejected: 'Rejected',
};

export const INSPECTION_STATUS_PILL_CLASS: Record<string, string> = {
  approved: 'bg-green-50 text-green-600 border-green-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
  lab_pending: 'bg-purple-50 text-purple-600 border-purple-200',
  submitted: 'bg-amber-50 text-amber-700 border-amber-100',
  in_review: 'bg-amber-50 text-amber-700 border-amber-100',
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
};

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
  is_reinspection: boolean | null;
};

export type ApiInspectionPagedData = {
  counts: {
    in_review: number;
    pending: number;
    submitted: number;
    lab_pending: number;
    approved: number;
    rejected: number;
    cancelled: number;
  };
  data: ApiInspectionRecord[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

export type InspectionDetailsApiResponse = {
  id: string;
  status: string;
  tanker: {
    plate: string;
    type: InspectionTankerType;
    owner: {
      name: string;
      phone: string;
      whatsapp: string | null;
      email: string | null;
    };
    cluster: string;
    governorate: string;
    capacity_litres: number | null;
  };
  assignment: {
    inspector_name: string;
    scheduled_date: string | null;
    physical_date: string | null;
    physical_score: number | null;
    submitted_at: string | null;
  };
  permit: {
    status: string | null;
    filePath: string | null;
    permit_number: string | null;
    issued_at: string | null;
    expires_at: string | null;
  };
  rejection: {
    reason: string | null;
    stage: string | null;
  };
  inspection: {
    sections: {
      section: string;
      items: {
        item: string;
        result: 'pass' | 'fail';
        comment: string;
        photos: {
          id: string;
          presigned_url: string;
          presigned_thumbnail_url: string | null;
          presigned_url_expires_at: string;
        }[];
      }[];
    }[];
    checklistStatus: {
      pass: number;
      fail: number | null;
    };
    final_result: 'fit' | 'not_fit' | 'fit-with-remarks' | string | null;
    inspector_comments: string | null;
    required_documents: {
      id: string;
      presigned_url: string;
      presigned_thumbnail_url: string | null;
      presigned_url_expires_at: string;
    }[];
  };
  lab: {
    required: boolean;
    status: string | null;
    report: {
      id: string | null;
      presigned_url: string | null;
      presigned_thumbnail_url: string | null;
      presigned_url_expires_at: string | null;
    };
  };
  timeline: {
    at: string;
    event: string;
    actor: string;
    status: string;
    note?: string | null;
  }[];
  inspection_ref: string;
  is_reinspection: boolean;
  reinspection_of: string | null;
  permit_history: {
    permit_number: string;
    issued_at: string | null;
    expires_at: string | null;
    status: string;
  }[];
};

export type SendNotificationRequest = {
  email: string;
  mobileNo: string;
  sendEmail: boolean;
  sendWhatsapp: boolean;
  inspectionId: number;
};
