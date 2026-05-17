import type { ReactNode } from 'react';
import { cn } from '@/utils';

type Props = {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
};

export function MetricCard({
  label,
  value,
  sub,
  footer,
  variant = 'default',
  className,
}: Props) {
  const isPrimary = variant === 'primary';
  return (
    <article
      className={cn(
        'rounded-card-lg border p-4 shadow-card-sm',
        isPrimary
          ? 'border-teal-800 bg-teal-900 text-white'
          : 'border-ink-200 bg-white',
        className,
      )}
    >
      <p
        className={cn(
          'mb-2 text-[11px] font-semibold uppercase tracking-widest',
          isPrimary ? 'text-white/70' : 'text-ink-500',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'text-[28px] font-bold leading-none',
          isPrimary ? 'text-white' : 'text-ink-900',
        )}
      >
        {value}
      </p>
      {sub ? (
        <p
          className={cn(
            'mt-1 text-[12px]',
            isPrimary ? 'text-white/75' : 'text-ink-400',
          )}
        >
          {sub}
        </p>
      ) : null}
      {footer ? (
        <p
          className={cn(
            'mt-2 text-[11px]',
            isPrimary ? 'text-white/60' : 'text-ink-400',
          )}
        >
          {footer}
        </p>
      ) : null}
    </article>
  );
}
