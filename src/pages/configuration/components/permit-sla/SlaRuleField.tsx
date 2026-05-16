import { Input } from '@/atoms';

type Props = {
  label: string;
  value: number;
  unit: string;
  hint: string;
  error?: string;
  onChange: (v: number) => void;
};

export function SlaRuleField({
  label,
  value,
  unit,
  hint,
  error,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-ink-700">
        {label}
      </label>
      <Input
        type="number"
        min={1}
        value={value}
        invalid={!!error}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          onChange(isNaN(parsed) ? 0 : parsed);
        }}
        rightSlot={unit}
      />
      {error ? (
        <p className="mt-1.5 text-[11px] leading-snug text-red-600">{error}</p>
      ) : (
        <p className="mt-1.5 text-[12px] leading-snug text-ink-500">{hint}</p>
      )}
    </div>
  );
}
