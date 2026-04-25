import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        'h-[38px] w-full rounded-card border px-3 text-[13px] text-ink-900 outline-none bg-white placeholder:text-ink-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20',
        invalid ? 'border-red-500' : 'border-ink-300',
        className,
      )}
    />
  );
});
