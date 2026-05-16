import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

type DotColor = 'blue' | 'green' | 'purple' | 'red' | 'gray';

const DOT_STYLES: Record<
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

type TimelineStep = {
  key: string;
  title: string;
  dot: DotColor;
  pending: boolean;
  actor?: string;
  at?: string;
  note?: string | null;
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

function matchEvent(
  timeline: TimelineEntry[],
  predicate: (e: string, status: string) => boolean,
): TimelineEntry | undefined {
  return timeline.find((entry) =>
    predicate(
      (entry.event ?? '').toLowerCase(),
      (entry.status ?? '').toLowerCase(),
    ),
  );
}

function buildSteps(data: InspectionDetailsApiResponse): TimelineStep[] {
  const { timeline, tanker, lab, status, assignment, permit, rejection } = data;
  const isDW = tanker.type === 'DW';
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

  const canonical: CanonicalKey[] = [
    'physical_inspection',
    ...(isDW ? (['sample_collected', 'lab_report'] as CanonicalKey[]) : []),
    'cm_review',
    'final_decision',
    ...(isApproved ? (['permit_issued'] as CanonicalKey[]) : []),
  ];

  const sampleDone =
    !!matchEvent(timeline, (e) => e.includes('sample')) ||
    (isDW &&
      (status === 'lab_pending' ||
        status === 'in_review' ||
        isApproved ||
        isRejected));
  const labDone =
    !!matchEvent(timeline, (e) => e.includes('lab')) || !!lab.report.id;
  const dwPrereqMet = !isDW || (sampleDone && labDone);

  return canonical.map((key) => {
    const title = CANONICAL_TITLE[key];
    let dot: DotColor = CANONICAL_DOT[key];
    let pending = true;
    let actor: string | undefined;
    let at: string | undefined;
    let note: string | null | undefined;

    if (key === 'physical_inspection') {
      const ev = matchEvent(
        timeline,
        (e) => e.includes('submit') || e.includes('physical'),
      );
      const done = !!ev || !!assignment.submitted_at || status !== 'pending';
      pending = !done;
      actor = ev?.actor ?? assignment.inspector_name;
      at = ev?.at ?? assignment.submitted_at ?? undefined;
      note =
        ev?.note ?? 'Checklist completed · All items rated · Photos attached';
    } else if (key === 'sample_collected') {
      const ev = matchEvent(timeline, (e) => e.includes('sample'));
      const done =
        !!ev ||
        (isDW &&
          (status === 'lab_pending' ||
            status === 'in_review' ||
            isApproved ||
            isRejected));
      pending = !done;
      actor = ev?.actor ?? assignment.inspector_name;
      at = ev?.at ?? assignment.submitted_at ?? undefined;
      note = ev?.note ?? null;
    } else if (key === 'lab_report') {
      const ev = matchEvent(timeline, (e) => e.includes('lab'));
      const done = !!ev || !!lab.report.id;
      pending = !done;
      actor = ev?.actor;
      at = ev?.at;
      note = ev?.note ?? (done ? null : 'Awaiting lab report PDF upload');
    } else if (key === 'cm_review') {
      const ev = matchEvent(
        timeline,
        (e, s) =>
          (e.includes('review') && !e.includes('reject')) || s === 'in_review',
      );
      const done =
        dwPrereqMet &&
        (!!ev || isApproved || isRejected || status === 'in_review');
      pending = !done;
      actor = ev?.actor;
      at = ev?.at;
      note =
        ev?.note ??
        (!dwPrereqMet
          ? 'Will be available once sample is collected and lab report is uploaded'
          : null);
    } else if (key === 'final_decision') {
      const ev = matchEvent(
        timeline,
        (e) => e.includes('approv') || e.includes('reject'),
      );
      const done = dwPrereqMet && (isApproved || isRejected || !!ev);
      pending = !done;
      if (isApproved) {
        dot = 'green';
      } else if (isRejected) {
        dot = 'red';
      }
      actor = ev?.actor;
      at = ev?.at ?? permit.issued_at ?? undefined;
      note = ev?.note ?? (isRejected ? rejection.reason : null);
    } else if (key === 'permit_issued') {
      const ev = matchEvent(
        timeline,
        (e) => e.includes('permit') || e.includes('issued'),
      );
      const done = !!ev || !!permit.permit_number;
      pending = !done;
      actor = ev?.actor ?? 'System (auto-generated)';
      at = ev?.at ?? permit.issued_at ?? undefined;
      note =
        ev?.note ??
        (permit.permit_number ? `Permit No: ${permit.permit_number}` : null);
    }

    return { key, title, dot, pending, actor, at, note };
  });
}

function formatAt(at?: string): string {
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

export function ActivityTimeline({ data }: Props) {
  const steps = buildSteps(data);

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
      <div className="border-b border-ink-100 bg-white px-5 py-3.5">
        <span className="text-[14px] font-semibold text-ink-800">
          Activity Timeline
        </span>
      </div>
      <div className="bg-white px-5 py-6">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const { bg, border, detail } = DOT_STYLES[step.dot];
          const pendingDot = DOT_STYLES.gray;
          return (
            <div
              key={step.key}
              className={`flex gap-4 ${isLast ? '' : 'pb-[22px]'}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`mt-[3px] h-3 w-3 shrink-0 rounded-full border-2 ${
                    step.pending
                      ? `${pendingDot.bg} ${pendingDot.border}`
                      : `${bg} ${border}`
                  }`}
                />
                {!isLast && (
                  <div
                    className="mt-[3px] w-0.5 flex-1 bg-ink-200"
                    style={{ minHeight: 28 }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <span
                    className={`text-[13px] ${
                      step.pending
                        ? 'font-normal text-ink-400'
                        : 'font-semibold text-ink-800'
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.pending ? (
                    <span className="text-[11px] text-ink-400">🕐 Pending</span>
                  ) : (
                    <span className="text-[11px] text-ink-400">
                      {[step.actor, formatAt(step.at)]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  )}
                </div>
                {step.note && (
                  <div
                    className={`rounded border-l-2 bg-ink-50 px-2.5 py-1.5 text-[11px] ${
                      step.pending
                        ? 'border-ink-300 text-ink-400'
                        : `${detail} text-ink-600`
                    }`}
                  >
                    {step.note}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
