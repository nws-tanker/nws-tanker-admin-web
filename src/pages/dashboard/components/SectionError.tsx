type Props = { message: string; onRetry: () => void };

export default function SectionError({ message, onRetry }: Props) {
  return (
    <div className="flex items-center justify-between rounded-card-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      <span>{message}</span>
      <button onClick={onRetry} className="ml-4 font-medium underline">
        Retry
      </button>
    </div>
  );
}
