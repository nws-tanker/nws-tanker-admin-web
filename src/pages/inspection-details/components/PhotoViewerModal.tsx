import { useState } from 'react';
import { Modal } from '@/atoms/Modal';

type Photo = { id: string; url: string; thumb: string | null };
export type ViewerState = { photos: Photo[]; idx: number };

export function PhotoViewerModal({
  state,
  onClose,
}: {
  state: ViewerState;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(state.idx);
  const photo = state.photos[idx];

  return (
    <Modal
      open
      onClose={onClose}
      title="Inspection Photo"
      subtitle={`Photo ${idx + 1} of ${state.photos.length}`}
      width={640}
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="h-8 rounded-lg border border-ink-200 bg-white px-3 text-[12px] font-medium text-ink-600 disabled:opacity-40 hover:bg-ink-50"
            >
              ← Prev
            </button>
            <button
              onClick={() =>
                setIdx((i) => Math.min(state.photos.length - 1, i + 1))
              }
              disabled={idx === state.photos.length - 1}
              className="h-8 rounded-lg border border-ink-200 bg-white px-3 text-[12px] font-medium text-ink-600 disabled:opacity-40 hover:bg-ink-50"
            >
              Next →
            </button>
          </div>
          <button
            onClick={onClose}
            className="h-8 rounded-lg border border-ink-200 bg-white px-4 text-[12px] font-medium text-ink-700 hover:bg-ink-50"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={photo.url}
          alt="Inspection photo"
          className="max-h-[420px] w-full rounded-lg object-contain bg-ink-50"
        />
        {state.photos.length > 1 && (
          <div className="flex gap-2">
            {state.photos.map((p, i) => (
              <button key={p.id} onClick={() => setIdx(i)}>
                <img
                  src={p.thumb ?? p.url}
                  alt=""
                  className={`h-12 w-12 rounded object-cover border-2 transition-colors ${
                    i === idx
                      ? 'border-teal-600'
                      : 'border-ink-200 opacity-60 hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
