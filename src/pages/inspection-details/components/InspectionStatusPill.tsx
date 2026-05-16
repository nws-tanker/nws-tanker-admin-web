import {
  INSPECTION_STATUS_LABEL,
  INSPECTION_STATUS_PILL_CLASS,
} from '@/types/inspection';
import { cn } from '@/utils';

type Props = { status: string; inspectionRef: string };

export function InspectionStatusPill({ status, inspectionRef }: Props) {
  const label = INSPECTION_STATUS_LABEL[status] ?? status;
  const pillClass =
    INSPECTION_STATUS_PILL_CLASS[status] ??
    'bg-ink-50 text-ink-600 border-ink-200';

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[12px] text-ink-400">
        {inspectionRef}
      </span>
      <span
        className={cn(
          'whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold',
          pillClass,
        )}
      >
        {label}
      </span>
    </div>
  );
}
