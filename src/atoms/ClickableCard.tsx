import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  children: ReactNode;
};

export function ClickableCard({ className, children, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'block w-full cursor-pointer text-left transition-colors hover:bg-ink-50 focus:bg-ink-50 focus:outline-none',
        className,
      )}
    >
      {children}
    </button>
  );
}
