import { Button } from '@/atoms';
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
          <Button
            key={t.key}
            variant="ghost"
            onClick={() => onChange(t.key)}
            className={cn(
              'relative -mb-px rounded-none border-x-0 border-t-0 border-b-2 px-4 py-2.5 text-[13px] font-medium hover:bg-transparent',
              isActive
                ? 'border-b-teal-700 text-ink-900'
                : 'border-b-transparent text-ink-500 hover:text-ink-700',
            )}
          >
            {t.label}
          </Button>
        );
      })}
    </div>
  );
}
