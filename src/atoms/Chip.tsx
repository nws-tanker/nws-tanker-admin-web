import type { ReactNode } from 'react';
import { cn } from '@/utils';

export type ChipTone = 'blue' | 'amber' | 'green' | 'teal' | 'gray';

const TONE_CLASS: Record<ChipTone, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  green: 'bg-green-50 text-green-700 border-green-100',
  teal: 'bg-teal-50 text-teal-900 border-teal-50',
  gray: 'bg-ink-100 text-ink-700 border-ink-200',
};

type Props = {
  tone?: ChipTone;
  children: ReactNode;
  className?: string;
};

export function Chip({ tone = 'gray', children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-card-sm border px-2.5 py-[3px] text-[11px] font-medium',
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
