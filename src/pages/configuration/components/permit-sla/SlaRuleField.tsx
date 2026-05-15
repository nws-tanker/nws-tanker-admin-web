import { Input } from '@/atoms';

type Props = {
  label: string;
  value: number;
  unit: string;
  hint: string;
  onChange: (v: number) => void;
};

export function SlaRuleField({ label, value, unit, hint, onChange }: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-ink-700">
        {label}
      </label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        rightSlot={unit}
      />
      <p className="mt-1.5 text-[12px] leading-snug text-ink-500">{hint}</p>
    </div>
  );
}
