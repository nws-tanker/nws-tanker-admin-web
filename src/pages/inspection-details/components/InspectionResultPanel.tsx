import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

type ResultStyle = {
  label: string;
  icon: string;
  cardBg: string;
  cardBorder: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  iconBg: string;
  iconText: string;
};

const RESULT_STYLES: Record<
  'fit' | 'fit_with_remarks' | 'not_fit',
  ResultStyle
> = {
  fit: {
    label: 'Fit for Service',
    icon: '✓',
    cardBg: 'bg-green-50',
    cardBorder: 'border-green-200',
    pillBg: 'bg-green-100',
    pillText: 'text-green-800',
    pillBorder: 'border-green-300',
    iconBg: 'bg-green-500',
    iconText: 'text-white',
  },
  fit_with_remarks: {
    label: 'Fit with Remarks',
    icon: '!',
    cardBg: 'bg-amber-50',
    cardBorder: 'border-amber-200',
    pillBg: 'bg-amber-100',
    pillText: 'text-amber-900',
    pillBorder: 'border-amber-300',
    iconBg: 'bg-amber-500',
    iconText: 'text-white',
  },
  not_fit: {
    label: 'Not Fit for Service',
    icon: '✕',
    cardBg: 'bg-red-50',
    cardBorder: 'border-red-200',
    pillBg: 'bg-red-100',
    pillText: 'text-red-800',
    pillBorder: 'border-red-300',
    iconBg: 'bg-red-500',
    iconText: 'text-white',
  },
};

function normalize(raw: string): keyof typeof RESULT_STYLES | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, '_');
  if (key === 'fit') return 'fit';
  if (key === 'not_fit' || key === 'unfit') return 'not_fit';
  if (key === 'fit_with_remarks') return 'fit_with_remarks';
  return null;
}

export function InspectionResultPanel({ data }: Props) {
  const { final_result, inspector_comments } = data.inspection;
  const normalized = final_result ? normalize(final_result) : null;
  const style = normalized ? RESULT_STYLES[normalized] : null;
  const hasComments = !!inspector_comments && inspector_comments.trim() !== '';

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <span className="text-[14px] font-semibold text-ink-800">
          Inspector Decision
        </span>
      </div>

      {style ? (
        <div
          className={`flex items-center gap-3 border-b ${style.cardBorder} ${style.cardBg} px-4 py-3`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[16px] font-bold ${style.iconBg} ${style.iconText}`}
          >
            {style.icon}
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
              Final Result
            </span>
            <span
              className={`mt-0.5 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${style.pillBg} ${style.pillText} ${style.pillBorder}`}
            >
              {style.label}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
            Final Result
          </span>
          <span className="text-[13px] italic text-ink-400">
            {final_result ?? 'Not provided'}
          </span>
        </div>
      )}

      <div className="px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
          Inspector Comments
        </p>
        <p
          className={`mt-1 text-[13px] leading-relaxed ${
            hasComments ? 'text-ink-800' : 'italic text-ink-400'
          }`}
        >
          {hasComments ? inspector_comments : 'No comments'}
        </p>
      </div>
    </div>
  );
}
