import { DOT_STYLES, formatAt, type TimelineStep } from './buildSteps';

type Props = {
  step: TimelineStep;
  isLast: boolean;
};

export function TimelineRow({ step, isLast }: Props) {
  const { bg, border, detail } = DOT_STYLES[step.dot];
  const pendingDot = DOT_STYLES.gray;

  return (
    <div className={`flex gap-4 ${isLast ? '' : 'pb-[22px]'}`}>
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
              {[step.actor, formatAt(step.at)].filter(Boolean).join(' · ')}
            </span>
          )}
        </div>
        {step.statusChip && !step.pending && (
          <div className="mb-1.5">
            <span className="inline-block rounded-full bg-ink-100 px-2 py-0.5 font-mono text-[10px] text-ink-600">
              {step.statusChip}
            </span>
          </div>
        )}
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
}
