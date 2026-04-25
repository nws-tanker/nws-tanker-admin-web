import { cn } from '@/utils';

type Props = {
  label: string;
  value: string;
  mono?: boolean;
};

export function Field({ label, value, mono }: Props) {
  return (
    <div className="rounded-md bg-ink-50 px-3 py-2.5">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        {label}
      </div>
      <div
        className={cn(
          'text-[13px] font-semibold text-ink-900',
          mono && 'font-mono',
        )}
      >
        {value}
      </div>
    </div>
  );
}
