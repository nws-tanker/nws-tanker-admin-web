type Props = {
  label: string;
  dotClass: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
};

export function StatusBadge({
  label,
  dotClass,
  bgClass,
  borderClass,
  textClass,
}: Props) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${bgClass} ${borderClass} ${textClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}
