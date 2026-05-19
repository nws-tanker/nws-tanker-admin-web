type Props = { label: string; value: number; red?: boolean };

export default function StatCell({ label, value, red }: Props) {
  return (
    <div>
      <div className="text-xs text-ink-400">{label}</div>
      <div
        className={`mt-0.5 font-semibold ${red ? 'text-red-600' : 'text-ink-800'}`}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
