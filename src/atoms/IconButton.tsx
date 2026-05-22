import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

type Variant = 'default' | 'ghost-dark';
type Size = 'sm' | 'md';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  variant?: Variant;
  size?: Size;
  showDot?: boolean;
  count?: number;
};

const VARIANT_CLASS: Record<Variant, string> = {
  default: 'text-ink-500 hover:bg-ink-100',
  'ghost-dark': 'text-white/45 hover:bg-white/10 hover:text-white/90',
};

const SIZE_CLASS: Record<Size, string> = {
  sm: 'h-7 w-7 rounded-md',
  md: 'h-9 w-9 rounded-card',
};

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  showDot,
  count,
  className,
  ...rest
}: Props) {
  const hasCount = typeof count === 'number' && count > 0;
  const displayCount = hasCount && count! > 99 ? '99+' : count;
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'relative grid place-items-center transition-colors',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
    >
      {icon}
      {hasCount ? (
        <span className="absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
          {displayCount}
        </span>
      ) : showDot ? (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
      ) : null}
    </button>
  );
}
