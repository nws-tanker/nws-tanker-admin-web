import type { ReactNode } from 'react';
import { Input } from '@/atoms';

type Props = {
  label: string;
  required?: boolean;
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  hint: string;
  error?: string;
  type?: 'tel' | 'email';
  tone?: 'default' | 'accent';
  disabled?: boolean;
};

export function NotificationField({
  label,
  required,
  icon,
  value,
  onChange,
  hint,
  error,
  type = 'tel',
  tone = 'default',
  disabled,
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-ink-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Input
        type={type}
        tone={error ? 'default' : tone}
        invalid={!!error}
        leftSlot={icon}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono"
        disabled={disabled}
      />
      {error ? (
        <p className="mt-1.5 text-[11px] leading-snug text-red-600">{error}</p>
      ) : (
        <p className="mt-1.5 text-[11px] leading-snug text-ink-500">{hint}</p>
      )}
    </div>
  );
}
