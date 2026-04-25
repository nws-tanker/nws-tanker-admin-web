import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-teal-900 text-white border-teal-900 hover:bg-teal-800 hover:border-teal-800',
  secondary:
    'bg-white text-ink-700 border-ink-300 shadow-card-sm hover:bg-ink-50 hover:border-ink-400',
  ghost: 'text-ink-600 border-transparent hover:bg-ink-100',
  danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
};

const SIZE_CLASS: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-[12px]',
  md: 'px-3.5 py-[7px] text-[13px]',
  lg: 'px-4 py-2.5 text-sm',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-card border font-medium leading-none whitespace-nowrap transition-colors disabled:opacity-40 disabled:cursor-default',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        variant === 'ghost' && size === 'md' && 'px-2.5',
        className,
      )}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
