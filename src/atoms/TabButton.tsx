import type { ReactNode } from 'react';
import { cn } from '@/utils';

type Props = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function TabButton({ active, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors',
        active
          ? 'border-b-2 border-teal-800 text-teal-900 -mb-px'
          : 'text-ink-500 hover:text-ink-800',
      )}
    >
      {children}
    </button>
  );
}
