import { useRef, useState, type DragEvent } from 'react';
import { Button } from '@/atoms';
import { UploadIcon } from '@/atoms/icons';
import { cn } from '@/utils';

const ACCEPT = '.xlsx,.xls,.csv';

type Props = {
  onFile: (file: File) => void;
};

export function DropZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={cn(
        'mb-5 cursor-pointer rounded-card-lg border-2 border-dashed px-8 py-14 text-center transition-colors',
        dragActive ? 'border-teal-600 bg-teal-50' : 'border-ink-300 bg-ink-50',
      )}
      onClick={() => inputRef.current?.click()}
    >
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-ink-100 text-ink-400">
        <UploadIcon />
      </div>
      <div className="mb-1.5 text-[15px] font-semibold text-ink-800">
        Drag &amp; drop your file here
      </div>
      <div className="mb-5 text-[13px] text-ink-500">Supports .xlsx, .csv</div>
      <Button
        variant="secondary"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Browse file
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          // Reset so the same file can be re-picked
          e.target.value = '';
        }}
      />
    </div>
  );
}
