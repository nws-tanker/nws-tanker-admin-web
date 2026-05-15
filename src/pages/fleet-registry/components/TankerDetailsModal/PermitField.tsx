import { cn } from '@/utils';

type Props = {
  label: string;
  value: string;
  mono?: boolean;
  valueClassName?: string;
};

export function PermitField({ label, value, mono, valueClassName }: Props) {
  return (
    <div>
      <div className="mb-0.5 text-[10px] text-ink-400">{label}</div>
      <div
        className={cn(
          'text-[12px] font-semibold',
          !valueClassName && 'text-ink-800',
          mono && 'font-mono font-bold text-ink-900',
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}
