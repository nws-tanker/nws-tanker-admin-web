import { cn } from '@/utils';

type Tone = 'neutral' | 'success' | 'danger' | 'muted';

const TONE_CLASS: Record<Tone, string> = {
  neutral: 'text-ink-800',
  success: 'text-green-600',
  danger: 'text-red-600',
  muted: 'text-ink-400',
};

type Props = {
  label: string;
  value: number;
  tone?: Tone;
};

export function SummaryStat({ label, value, tone = 'neutral' }: Props) {
  return (
    <div className="rounded-card border border-ink-200 bg-ink-50 px-4 py-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </div>
      <div className={cn('font-mono text-[26px] font-bold', TONE_CLASS[tone])}>
        {value}
      </div>
    </div>
  );
}
