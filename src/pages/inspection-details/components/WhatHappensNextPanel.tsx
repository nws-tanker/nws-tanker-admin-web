type Props = { items: string[] };

export function WhatHappensNextPanel({ items }: Props) {
  return (
    <div
      className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white"
      style={{ padding: '14px 16px' }}
    >
      <p className="text-[12px] font-bold text-ink-700 mb-2.5">
        What happens next?
      </p>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 mb-1.5">
          <span className="text-[12px] text-teal-700">→</span>
          <span className="text-[12px] text-ink-600">{item}</span>
        </div>
      ))}
    </div>
  );
}
