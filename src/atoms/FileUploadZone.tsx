import { useRef, useState, type DragEvent } from 'react';
import { cn } from '@/utils';

type Props = {
  accept?: string;
  file: File | null;
  onFile: (file: File | null) => void;
  error?: string;
};

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function FileUploadZone({
  accept = '.pdf,.jpg,.jpeg,.png',
  file,
  onFile,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFile(dropped);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload file"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'cursor-pointer rounded-card-lg border-2 border-dashed p-5 text-center transition-colors',
          dragging || file
            ? 'border-teal-600 bg-teal-50'
            : error
              ? 'border-red-400 bg-ink-50'
              : 'border-ink-300 bg-ink-50',
        )}
      >
        {file ? (
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-red-100">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-ink-800">
                {file.name}
              </div>
              <div className="mt-0.5 text-[11px] text-ink-400">
                {formatSize(file.size)}
              </div>
            </div>
            <button
              type="button"
              aria-label="Remove file"
              onClick={(e) => {
                e.stopPropagation();
                onFile(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="shrink-0 p-1 text-ink-400 hover:text-ink-600"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto mb-2.5 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-ink-100 text-ink-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-ink-700">
              Drag &amp; drop or{' '}
              <span className="text-teal-700 underline">browse</span>
            </p>
            <p className="mt-0.5 text-[11.5px] text-ink-400">
              PDF, JPG or PNG · Max 5 MB
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onFile(e.target.files[0]);
        }}
      />
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
