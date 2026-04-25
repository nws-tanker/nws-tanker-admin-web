import type { ReactNode } from 'react';
import { cn } from '@/utils';

export type StatusTone = 'green' | 'red' | 'amber' | 'blue' | 'gray' | 'teal';

const TONE_CLASS: Record<StatusTone, { dot: string; text: string }> = {
  green: { dot: 'bg-green-600', text: 'text-green-700' },
  red: { dot: 'bg-red-600', text: 'text-red-700' },
  amber: { dot: 'bg-amber-500', text: 'text-amber-700' },
  blue: { dot: 'bg-blue-500', text: 'text-blue-700' },
  gray: { dot: 'bg-ink-400', text: 'text-ink-500' },
  teal: { dot: 'bg-teal-700', text: 'text-teal-900' },
};

/** Text color class for a given status tone — exported for callers that need
 *  to color related text (e.g. an expiry value) consistent with the tone. */
export function statusToneTextClass(tone: StatusTone): string {
  return TONE_CLASS[tone].text;
}

type Props = {
  label: ReactNode;
  tone: StatusTone;
  suffix?: ReactNode;
  className?: string;
};

export function StatusIndicator({ label, tone, suffix, className }: Props) {
  const { dot, text } = TONE_CLASS[tone];
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('h-2 w-2 shrink-0 rounded-full', dot)} />
      <span className={cn('text-[12px] font-semibold', text)}>{label}</span>
      {suffix}
    </div>
  );
}
