import type { ReactNode } from 'react';
import { Input } from '@/atoms';

type Props = {
  label: string;
  required?: boolean;
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  hint: string;
  type?: 'tel' | 'email';
  tone?: 'default' | 'accent';
};

export function NotificationField({
  label,
  required,
  icon,
  value,
  onChange,
  hint,
  type = 'tel',
  tone = 'default',
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-ink-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Input
        type={type}
        tone={tone}
        leftSlot={icon}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono"
      />
      <p className="mt-1.5 text-[11px] leading-snug text-ink-500">{hint}</p>
    </div>
  );
}
