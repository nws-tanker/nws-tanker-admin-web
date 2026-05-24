import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, indeterminate, ...rest },
  ref,
) {
  return (
    <input
      ref={(el) => {
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
        if (el) el.indeterminate = !!indeterminate;
      }}
      type="checkbox"
      {...rest}
      className={cn(
        'h-4 w-4 cursor-pointer rounded border-ink-300 text-teal-700 accent-teal-700 focus:ring-2 focus:ring-teal-500/40',
        className,
      )}
    />
  );
});
