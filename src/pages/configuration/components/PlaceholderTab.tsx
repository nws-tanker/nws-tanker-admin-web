type Props = {
  label: string;
};

export function PlaceholderTab({ label }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-card-lg border border-dashed border-ink-300 bg-white">
      <div className="text-center">
        <p className="text-[14px] font-medium text-ink-500">{label}</p>
        <p className="mt-1 text-[12px] text-ink-400">Coming soon</p>
      </div>
    </div>
  );
}
