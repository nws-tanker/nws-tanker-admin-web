import type {
  ApiInspectionPagedData,
  ApiInspectionRecord,
  InspectionRecord,
  InspectionScreenData,
  InspectionTab,
  InspectionTabCounts,
  InspectionTankerType,
} from '@/types/inspection';

export const INSPECTION_TAB_API_PARAM: Record<InspectionTab, string> = {
  'pending-review': 'PENDING_REVIEW',
  'pending-inspection': 'PENDING_INSPECTION',
  'lab-testing': 'LAB_TESTING',
  approved: 'APPROVED',
  rejected: 'REJECTED',
};

export function formatInspectionDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ── Mappers ───────────────────────────────────────────────────────

const VALID_TANKER_TYPES = new Set(['DW', 'SW', 'TE']);

export function mapInspectionRecord(
  raw: ApiInspectionRecord,
): InspectionRecord {
  return {
    id: raw.id,
    inspectionId: raw.inspection_id,
    plate: raw.plate,
    tankerType: (VALID_TANKER_TYPES.has(raw.tanker_type)
      ? raw.tanker_type
      : 'DW') as InspectionTankerType,
    governorate: raw.governorate,
    cluster: raw.cluster,
    inspectorName: raw.inspector_name,
    submittedAt: raw.submitted_at,
    priorStage: raw.prior_stage as InspectionRecord['priorStage'],
    inspectionDate: raw.inspection_date,
    scheduledDate: raw.scheduled_date,
    physicalDate: raw.physical_date,
    physicalScore: raw.physical_score,
    permitNumber: raw.permit_number,
    permitExpiresAt: raw.permit_expires_at,
    rejectionReason: raw.rejection_reason,
    rejectionStage: raw.rejection_stage,
  };
}

export function mapInspectionCounts(
  raw: ApiInspectionPagedData['counts'],
): InspectionTabCounts {
  return {
    pendingReview: raw.pending_review,
    pendingInspection: raw.pending_inspection,
    labTesting: raw.lab_testing,
    approved: raw.approved,
    rejected: raw.rejected,
  };
}

export function mapInspectionResponse(
  raw: ApiInspectionPagedData,
): InspectionScreenData {
  return {
    counts: mapInspectionCounts(raw.counts),
    records: raw.data.map(mapInspectionRecord),
    totalElements: raw.totalElements,
    totalPages: raw.totalPages,
    page: raw.page,
    size: raw.size,
  };
}
