type Props = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <div className="px-8 py-16 text-center text-ink-400">
      <div className="mb-2 text-[15px] font-medium">{title}</div>
      {description ? <div className="text-[13px]">{description}</div> : null}
    </div>
  );
}
