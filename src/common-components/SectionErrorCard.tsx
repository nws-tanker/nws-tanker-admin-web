type Props = {
  title?: string;
  message: string;
};

export default function SectionErrorCard({ title, message }: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      {title && (
        <div className="border-b border-ink-100 px-5 py-4">
          <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-3 py-14">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#FEE2E2" />
            <path
              d="M11 7v5.5"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="11" cy="15.5" r="1.1" fill="#EF4444" />
          </svg>
        </div>
        <p className="max-w-xs text-center text-sm text-ink-500">{message}</p>
      </div>
    </div>
  );
}
