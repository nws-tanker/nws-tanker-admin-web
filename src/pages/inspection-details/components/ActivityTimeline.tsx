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

function dotColorForEvent(event: string): DotColor {
  const e = event.toLowerCase();
  if (e.includes('reject')) return 'red';
  if (e.includes('approv')) return 'green';
  if (e.includes('lab') || e.includes('sample')) return 'purple';
  if (e.includes('inspect')) return 'blue';
  return 'gray';
}

function formatEventText(event: string): string {
  return event.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatAt(at: string): string {
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
  const { timeline } = data;

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
      <div className="border-b border-ink-100 bg-white px-5 py-3.5">
        <span className="text-[14px] font-semibold text-ink-800">
          Activity Timeline
        </span>
      </div>
      <div className="bg-white px-5 py-6">
        {timeline.map((entry, i) => {
          const isLast = i === timeline.length - 1;
          const dot = dotColorForEvent(entry.event);
          const { bg, border, detail } = DOT_STYLES[dot];
          return (
            <div key={i} className={`flex gap-4 ${isLast ? '' : 'pb-[22px]'}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`mt-[3px] h-3 w-3 shrink-0 rounded-full border-2 ${bg} ${border}`}
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
                  <span className="text-[13px] font-semibold text-ink-800">
                    {formatEventText(entry.event)}
                  </span>
                  <span className="text-[11px] text-ink-400">
                    {entry.actor} · {formatAt(entry.at)}
                  </span>
                </div>
                {entry.note && (
                  <div
                    className={`rounded border-l-2 bg-ink-50 px-2.5 py-1.5 text-[11px] text-ink-600 ${detail}`}
                  >
                    {entry.note}
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
