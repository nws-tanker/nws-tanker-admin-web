import { cn } from '@/utils';

export type ReportTabKey = 'invoice' | 'payment';

type Props = {
  active: ReportTabKey;
  onChange: (key: ReportTabKey) => void;
};

const TABS: { key: ReportTabKey; label: string }[] = [
  { key: 'invoice', label: 'Invoice Report' },
  { key: 'payment', label: 'Payment Report' },
];

export function ReportsTabs({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 border-b border-ink-200">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cn(
              'relative -mb-px px-4 py-2.5 text-[13px] font-medium transition-colors',
              isActive
                ? 'border-b-2 border-teal-700 text-ink-900'
                : 'border-b-2 border-transparent text-ink-500 hover:text-ink-700',
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
