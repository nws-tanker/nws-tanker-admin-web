import {
  INSPECTION_TANKER_TYPE,
  type InspectionDetailsApiResponse,
} from '@/types/inspection';

export type DotColor = 'blue' | 'green' | 'purple' | 'red' | 'gray';

export const DOT_STYLES: Record<
  DotColor,
  { bg: string; border: string; detail: string }
> = {
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    detail: 'border-blue-500',
  },
  green: {
    bg: 'bg-green-600',
    border: 'border-green-600',
    detail: 'border-green-600',
  },
  purple: {
    bg: 'bg-purple-600',
    border: 'border-purple-600',
    detail: 'border-purple-600',
  },
  red: { bg: 'bg-red-600', border: 'border-red-600', detail: 'border-red-600' },
  gray: {
    bg: 'bg-ink-200',
    border: 'border-ink-300',
    detail: 'border-ink-300',
  },
};

type CanonicalKey =
  | 'physical_inspection'
  | 'sample_collected'
  | 'lab_report'
  | 'cm_review'
  | 'final_decision'
  | 'permit_issued';

type TimelineEntry = InspectionDetailsApiResponse['timeline'][number];

export type TimelineStep = {
  key: string;
  title: string;
  dot: DotColor;
  pending: boolean;
  actor?: string;
  at?: string;
  note?: string | null;
  statusChip?: string;
};

const CANONICAL_TITLE: Record<CanonicalKey, string> = {
  physical_inspection: 'Physical Inspection Checklist',
  sample_collected: 'Sample Collected',
  lab_report: 'Lab Report Uploaded',
  cm_review: 'CM Review',
  final_decision: 'Final Decision',
  permit_issued: 'Permit Issued',
};

const CANONICAL_DOT: Record<CanonicalKey, DotColor> = {
  physical_inspection: 'blue',
  sample_collected: 'purple',
  lab_report: 'green',
  cm_review: 'blue',
  final_decision: 'green',
  permit_issued: 'green',
};

const CANONICAL_ROLE: Record<CanonicalKey, string | null> = {
  physical_inspection: 'Inspector',
  sample_collected: 'Inspector',
  lab_report: 'Supervisor',
  cm_review: 'Cluster Manager',
  final_decision: 'Cluster Manager',
  permit_issued: null,
};

function withRole(
  actor: string | undefined,
  role: string | null,
): string | undefined {
  if (!actor || !role) return actor;
  if (actor.includes('(')) return actor;
  return `${actor} (${role})`;
}

function findByEvent(
  timeline: TimelineEntry[],
  name: string,
): TimelineEntry | undefined {
  return timeline.find(
    (e) => (e.event ?? '').toLowerCase() === name.toLowerCase(),
  );
}

export function buildSteps(data: InspectionDetailsApiResponse): TimelineStep[] {
  const { timeline, tanker, lab, status, assignment, permit, rejection } = data;
  const isDW = tanker.type === INSPECTION_TANKER_TYPE.DW;
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';
  const permitIssued = !!permit.permit_number;

  const submitEv = findByEvent(timeline, 'submitted_for_review');
  const sampleEv = findByEvent(timeline, 'sample_dispatched');
  const labEv = findByEvent(timeline, 'lab_report_uploaded');
  const approvedEv = findByEvent(timeline, 'inspection_approved');
  const rejectedEv =
    findByEvent(timeline, 'inspection_reject') ??
    findByEvent(timeline, 'inspection_rejected');
  const decisionEv = isApproved ? approvedEv : isRejected ? rejectedEv : null;

  // Done-ness is derived from inspection status (a monotonic progression),
  // not from event presence. Events only supply actor + timestamp.
  // pending → submitted → lab_pending → in_review → approved/rejected
  const reachedSubmitted =
    status !== 'pending' || !!assignment.submitted_at || !!submitEv;
  const reachedLabPending =
    isDW &&
    (status === 'lab_pending' ||
      status === 'in_review' ||
      isApproved ||
      isRejected ||
      !!sampleEv);
  const reachedInReview =
    !!lab.report.id ||
    !!labEv ||
    status === 'in_review' ||
    isApproved ||
    isRejected;
  const decisionMade =
    isApproved || isRejected || !!approvedEv || !!rejectedEv || permitIssued;

  const physicalDone = reachedSubmitted;
  const sampleDone = !isDW
    ? false
    : reachedLabPending || reachedInReview || decisionMade;
  const labDone = !isDW ? false : reachedInReview || decisionMade;
  const inReview = status === 'in_review';
  const cmReviewDone = decisionMade || inReview || (!isDW && reachedInReview);
  const dwPrereqMet = !isDW || (sampleDone && labDone);

  const canonical: CanonicalKey[] = [
    'physical_inspection',
    ...(isDW ? (['sample_collected', 'lab_report'] as CanonicalKey[]) : []),
    'cm_review',
    'final_decision',
    ...(isApproved ? (['permit_issued'] as CanonicalKey[]) : []),
  ];

  return canonical.map((key) => {
    const title = CANONICAL_TITLE[key];
    let dot: DotColor = CANONICAL_DOT[key];
    let pending = true;
    let actor: string | undefined;
    let at: string | undefined;
    let note: string | null | undefined;
    let statusChip: string | undefined;

    if (key === 'physical_inspection') {
      pending = !physicalDone;
      actor = submitEv?.actor ?? assignment.inspector_name;
      at = submitEv?.at ?? assignment.submitted_at ?? undefined;
      note =
        submitEv?.note ??
        'Checklist completed · All items rated · Photos attached';
    } else if (key === 'sample_collected') {
      pending = !sampleDone;
      actor = sampleEv?.actor ?? assignment.inspector_name;
      at = sampleEv?.at ?? assignment.submitted_at ?? undefined;
      note = sampleEv?.note ?? null;
    } else if (key === 'lab_report') {
      pending = !labDone;
      actor = labEv?.actor;
      at = labEv?.at;
      note = labEv?.note ?? (labDone ? null : 'Awaiting lab report PDF upload');
      if (labDone) statusChip = 'lab_pending → under_review';
    } else if (key === 'cm_review') {
      pending = !cmReviewDone;
      actor = decisionEv?.actor;
      at = decisionEv?.at;
      const reviewedNote =
        isDW && labDone
          ? 'Inspection report and lab results reviewed'
          : 'Inspection report reviewed';
      const inReviewNote = inReview && !decisionMade;
      note =
        decisionEv?.note ??
        (!dwPrereqMet
          ? 'Will be available once sample is collected and lab report is uploaded'
          : inReviewNote
            ? 'Inspection report in review'
            : cmReviewDone && decisionMade
              ? reviewedNote
              : null);
    } else if (key === 'final_decision') {
      pending = !decisionMade;
      if (isApproved) dot = 'green';
      else if (isRejected) dot = 'red';
      actor = decisionEv?.actor;
      at = decisionEv?.at ?? permit.issued_at ?? undefined;
      note = decisionEv?.note ?? (isRejected ? rejection.reason : null);
      if (isApproved) statusChip = 'submitted → approved';
      else if (isRejected) statusChip = 'submitted → rejected';
    } else if (key === 'permit_issued') {
      pending = !permitIssued && !isApproved;
      actor = 'System (auto-generated)';
      at = permit.issued_at ?? undefined;
      note = permit.permit_number ? `Permit No: ${permit.permit_number}` : null;
    }

    return {
      key,
      title,
      dot,
      pending,
      actor: withRole(actor, CANONICAL_ROLE[key]),
      at,
      note,
      statusChip,
    };
  });
}

export function formatAt(at?: string): string {
  if (!at) return '';
  try {
    return new Date(at).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return at;
  }
}
