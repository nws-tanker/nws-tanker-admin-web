export type ApprovedInspectionTankerType =
  | 'drinking_water'
  | 'sewage_water'
  | 'treated_effluent';

export type ApprovedInspectionExpiryStatus =
  | 'valid'
  | 'expiring_soon'
  | 'expired';

export type ApprovedInspection = {
  inspection_id: number;
  plate_number: string;
  owner: string;
  tanker_type: ApprovedInspectionTankerType;
  cluster: string;
  cluster_id: number;
  governorate: string;
  governorate_id: number;
  permit_number: string;
  permit_issued_date: string;
  expiry_date: string;
  current_permit_url: string;
  last_inspector: string;
  owner_email: string;
  owner_contact: string;
  expiry_status: ApprovedInspectionExpiryStatus;
};

export type ApprovedInspectionsResponse = {
  data: ApprovedInspection[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
};

export type ApprovedInspectionsParams = {
  startDate?: string;
  endDate?: string;
  clusterId?: number;
  governorateId?: number;
  tankerType?: ApprovedInspectionTankerType;
  search?: string;
  page?: number;
  size?: number;
};

export type RegeneratePermitsRequest = {
  inspection_ids: number[];
  send_email: boolean;
  send_whatsapp: boolean;
  regeneration_remark: string;
};

export type RegeneratePermitsResponse = {
  regenerated_count?: number;
};
