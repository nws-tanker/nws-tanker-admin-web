import type { ReactNode } from 'react';
import { cn } from '@/utils';

export type BadgeTone = 'green' | 'red' | 'amber' | 'blue' | 'gray' | 'teal';

const TONE_CLASS: Record<BadgeTone, { wrap: string; dot: string }> = {
  green: {
    wrap: 'bg-green-50 text-green-700 border-green-100',
    dot: 'bg-green-500',
  },
  red: { wrap: 'bg-red-50 text-red-700 border-red-100', dot: 'bg-red-500' },
  amber: {
    wrap: 'bg-amber-50 text-amber-700 border-amber-100',
    dot: 'bg-amber-500',
  },
  blue: {
    wrap: 'bg-blue-50 text-blue-700 border-blue-100',
    dot: 'bg-blue-500',
  },
  gray: { wrap: 'bg-ink-100 text-ink-700 border-ink-200', dot: 'bg-ink-400' },
  teal: { wrap: 'bg-teal-50 text-teal-900 border-teal-50', dot: 'bg-teal-700' },
};

type Props = {
  tone: BadgeTone;
  withDot?: boolean;
  children: ReactNode;
  className?: string;
};

export function Badge({ tone, withDot = true, children, className }: Props) {
  const { wrap, dot } = TONE_CLASS[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-px text-[11px] font-medium leading-[1.5] whitespace-nowrap',
        wrap,
        className,
      )}
    >
      {withDot ? (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dot)} />
      ) : null}
      {children}
    </span>
  );
}
