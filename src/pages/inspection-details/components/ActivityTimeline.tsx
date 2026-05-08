import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

type DotColor = 'blue' | 'green' | 'purple' | 'red' | 'gray';

const DOT_CLASS: Record<DotColor, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  red: 'bg-red-600',
  gray: 'bg-ink-200 border border-ink-300',
};

const DETAIL_BORDER: Record<DotColor, string> = {
  blue: 'border-blue-500',
  green: 'border-green-600',
  purple: 'border-purple-600',
  red: 'border-red-600',
  gray: 'border-ink-300',
};

function dotColorForEvent(event: string): DotColor {
  const e = event.toLowerCase();
  if (e.includes('reject')) return 'red';
  if (e.includes('approv')) return 'green';
  if (e.includes('lab') || e.includes('sample')) return 'purple';
  if (e.includes('inspect')) return 'blue';
  return 'gray';
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
      <div className="border-b border-ink-100 bg-white px-4 py-3">
        <span className="text-[14px] font-semibold text-ink-800">
          Activity Timeline
        </span>
      </div>
      <div className="bg-white px-4 py-4">
        {timeline.map((entry, i) => {
          const isLast = i === timeline.length - 1;
          const dot = dotColorForEvent(entry.event);
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 shrink-0 rounded-full ${DOT_CLASS[dot]}`}
                />
                {!isLast && (
                  <div
                    className="mt-1 w-0.5 flex-1 bg-ink-200"
                    style={{ minHeight: 28 }}
                  />
                )}
              </div>
              <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-4'}`}>
                <div className="text-[13px] font-semibold text-ink-800">
                  {entry.event}
                </div>
                <div className="mt-0.5 text-[12px] text-ink-400">
                  {entry.actor} · {formatAt(entry.at)}
                </div>
                {entry.note && (
                  <div
                    className={`mt-1.5 rounded border-l-2 bg-ink-50 px-2.5 py-1.5 text-[11px] text-ink-600 ${DETAIL_BORDER[dot]}`}
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
