type Props = { totalItems: number };

export default function ChecklistInfoBanner({ totalItems }: Props) {
  return (
    <div
      className="flex items-start gap-3.5 rounded-card border border-teal-100 bg-teal-50/60 px-4 py-3.5"
      style={{ borderLeft: '3px solid #0f766e' }}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[12px] font-bold text-teal-900 mt-0.5">
        i
      </div>
      <p className="text-[13px] text-ink-700 leading-relaxed">
        All {totalItems} items currently apply to{' '}
        <span className="inline-flex items-center rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
          DW
        </span>{' '}
        <span className="inline-flex items-center rounded border border-amber-100 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
          SW
        </span>{' '}
        <span className="inline-flex items-center rounded border border-green-100 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
          TE
        </span>
        . To restrict an item to only some tanker types, click the{' '}
        <strong className="font-semibold text-ink-900">Applies to</strong> chips
        in its row — deselect any type it shouldn&apos;t run on. A single
        failure still marks the inspection non-compliant for the covered types.
      </p>
    </div>
  );
}
