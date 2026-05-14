import { ImageIcon } from '@/atoms/icons';

type Photo = { id: string; url: string; thumb: string | null };

export type ChecklistItem = {
  n: number;
  cat: string;
  text: string;
  pass: boolean;
  note: string | null;
  photos: Photo[];
};

type Props = {
  item: ChecklistItem;
  onOpenPhoto: (photos: Photo[], idx: number) => void;
};

export function ChecklistItemRow({ item, onOpenPhoto }: Props) {
  return (
    <div
      className={`flex items-start gap-3 border-b border-ink-100 px-4 py-3 ${item.pass ? 'bg-white' : 'bg-[#fef9f9]'}`}
    >
      <div
        className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded text-[11px] font-semibold ${
          item.pass ? 'bg-ink-200 text-ink-600' : 'bg-red-100 text-red-800'
        }`}
      >
        {String(item.n).padStart(2, '0')}
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-0.5 text-[12px] text-ink-400">{item.cat}</div>
        <div className="text-[13px] font-medium text-ink-800">{item.text}</div>
        {item.photos.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.photos.map((photo, pi) => (
              <button
                key={photo.id}
                onClick={() => onOpenPhoto(item.photos, pi)}
                className="flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-medium text-teal-700 hover:bg-teal-100 transition-colors"
              >
                <ImageIcon width={11} height={11} strokeWidth={2} />
                {item.photos.length > 1 ? `Photo ${pi + 1}` : 'View photo'}
              </button>
            ))}
          </div>
        )}
        {item.note && (
          <div className="mt-1.5 rounded border-l-2 border-amber-400 bg-amber-50 px-2.5 py-1.5 text-[11px] text-ink-600">
            {item.note}
          </div>
        )}
      </div>

      <div className="shrink-0">
        {item.pass ? (
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
            ✓ Pass
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700">
            ✗ Fail
          </span>
        )}
      </div>
    </div>
  );
}
