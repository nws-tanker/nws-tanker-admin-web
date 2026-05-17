import { useState } from 'react';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { PhotoViewerModal } from './PhotoViewerModal';
import type { ViewerState } from './PhotoViewerModal';

type Props = { data: InspectionDetailsApiResponse };

export function RequiredDocuments({ data }: Props) {
  const docs = data.inspection.required_documents ?? [];
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  const photos = docs.map((d) => ({
    id: d.id,
    url: d.presigned_url,
    thumb: d.presigned_thumbnail_url,
  }));

  return (
    <>
      <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm bg-white">
        <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
          <span className="text-[14px] font-semibold text-ink-800">
            Required Documents
          </span>
          <span className="text-[12px] text-ink-500">
            {docs.length} {docs.length === 1 ? 'document' : 'documents'}
          </span>
        </div>
        <div className="p-4">
          {docs.length === 0 ? (
            <p className="text-[13px] italic text-ink-400">
              No documents uploaded
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {photos.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setViewer({ photos, idx })}
                  className="group relative overflow-hidden rounded-lg border border-ink-200 bg-ink-50 hover:border-teal-500 transition-colors"
                >
                  <img
                    src={p.thumb ?? p.url}
                    alt={`Document ${idx + 1}`}
                    className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/55 px-2 py-1 text-left text-[10px] font-medium text-white">
                    Doc {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {viewer && (
        <PhotoViewerModal state={viewer} onClose={() => setViewer(null)} />
      )}
    </>
  );
}
