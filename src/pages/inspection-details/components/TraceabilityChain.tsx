import { CheckIcon } from '@/atoms/icons';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatDate } from '@/utils';

type Step = { label: string; ref: string; done: boolean };

type Props = { data: InspectionDetailsApiResponse };

function buildSteps(data: InspectionDetailsApiResponse): Step[] {
  const { tanker, assignment, lab, permit, status } = data;
  const isDW = tanker.type === 'DW';
  const decided = status === 'approved' || status === 'rejected';
  const inReview = status === 'in_review';
  const labUploaded = !!lab.report.id;
  const physDone = !!assignment.physical_date;

  const decisionLabel =
    status === 'approved'
      ? 'Permit\nIssued'
      : decided
        ? 'Rejected'
        : 'Decision';

  const decisionRef =
    status === 'approved'
      ? (permit.permit_number ?? 'Issued')
      : decided
        ? 'Rejected'
        : 'Pending';

  if (isDW) {
    return [
      {
        label: 'Physical\nInspection',
        ref: formatDate(assignment.physical_date),
        done: physDone,
      },
      { label: 'Sample\nDispatched', ref: '—', done: physDone },
      {
        label: 'Lab\nReport',
        ref: labUploaded ? 'Uploaded' : 'Pending',
        done: labUploaded,
      },
      {
        label: 'CM\nReview',
        ref: decided ? 'Reviewed' : inReview ? 'In Review' : 'Pending',
        done: decided || inReview,
      },
      { label: decisionLabel, ref: decisionRef, done: decided },
    ];
  }

  return [
    {
      label: 'Physical\nInspection',
      ref: formatDate(assignment.physical_date),
      done: physDone,
    },
    {
      label: 'CM\nReview',
      ref: decided ? 'Reviewed' : inReview ? 'In Review' : 'Pending',
      done: decided || inReview,
    },
    { label: decisionLabel, ref: decisionRef, done: decided },
  ];
}

export function TraceabilityChain({ data }: Props) {
  const steps = buildSteps(data);

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
      <div className="border-b border-ink-100 bg-ink-50 px-4 py-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
          Traceability Chain
        </span>
      </div>
      <div className="flex w-full items-start bg-white px-5 py-5">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const lineGreen = step.done && !isLast && steps[i + 1].done;
          const labelLines = step.label.split('\n');

          return (
            <div key={i} className="flex min-w-0 flex-1 items-start">
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${step.done ? 'bg-green-600 text-white' : 'bg-ink-200 text-ink-500'}`}
                >
                  {step.done ? (
                    <CheckIcon
                      width={12}
                      height={12}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ) : (
                    labelLines[0][0]
                  )}
                </div>
                <div className="mt-1.5 w-full text-center">
                  <div
                    className={`text-[11px] font-semibold ${step.done ? 'text-ink-800' : 'text-ink-400'}`}
                  >
                    {labelLines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < labelLines.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`break-all font-mono text-[9px] ${step.done ? 'text-ink-500' : 'text-ink-300'}`}
                  >
                    {step.ref}
                  </div>
                </div>
              </div>
              {!isLast && (
                <div
                  className={`mt-3 h-0.5 w-7 shrink-0 ${lineGreen ? 'bg-green-300' : 'bg-ink-200'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
