import type { ReactNode } from 'react';

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({
  label,
  required,
  error,
  children,
  className,
}: Props) {
  return (
    <div className={className}>
      <label className="text-[12px] font-medium text-gray-700 block mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
