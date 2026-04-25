type Props = {
  fileName: string;
};

export function ProcessingCard({ fileName }: Props) {
  return (
    <div className="mb-5 rounded-card-lg border border-ink-200 bg-white px-8 py-12 text-center shadow-card-sm">
      <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-[3px] border-ink-200 border-t-teal-600" />
      <div className="mb-1.5 text-[15px] font-semibold text-ink-800">
        Processing <span className="font-mono">{fileName}</span>…
      </div>
      <div className="text-[13px] text-ink-500">
        Validating rows. This may take a few seconds.
      </div>
    </div>
  );
}
