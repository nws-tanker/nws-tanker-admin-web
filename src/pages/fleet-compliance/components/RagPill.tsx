export default function RagPill({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-ink-700">
      {value}%
    </span>
  );
}
