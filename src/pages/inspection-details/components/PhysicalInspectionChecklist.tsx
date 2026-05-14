import { useState } from 'react';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ChecklistItemRow } from './ChecklistItemRow';
import type { ChecklistItem } from './ChecklistItemRow';
import { PhotoViewerModal } from './PhotoViewerModal';
import type { ViewerState } from './PhotoViewerModal';

type ApiSections = InspectionDetailsApiResponse['inspection']['sections'];

const CHIP_STYLE: Record<string, { bg: string; text: string }> = {
  'Vehicle Condition': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'Tanker Cleanliness': { bg: 'bg-teal-50', text: 'text-teal-700' },
  Documentation: { bg: 'bg-purple-100', text: 'text-purple-800' },
  'Safety Equipment': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'Sample Collection': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  'Operational Compliance': { bg: 'bg-green-100', text: 'text-green-800' },
};

function fromApiSections(sections: ApiSections): ChecklistItem[] {
  let n = 0;
  return sections.flatMap((s) =>
    s.items.map((item) => ({
      n: ++n,
      cat: s.section,
      text: item.item,
      pass: item.result === 'pass',
      note: item.comment || null,
      photos: item.photos.map((p) => ({
        id: p.id,
        url: p.presigned_url,
        thumb: p.presigned_thumbnail_url,
      })),
    })),
  );
}

type Props = { sections?: ApiSections };

export function PhysicalInspectionChecklist({ sections }: Props) {
  const checklist = sections ? fromApiSections(sections) : [];
  const categories = Array.from(new Set(checklist.map((i) => i.cat)));
  const totalPassed = checklist.filter((i) => i.pass).length;
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
        <div className="flex items-center justify-between border-b border-ink-100 bg-white px-4 py-3">
          <span className="text-[14px] font-semibold text-ink-800">
            Physical Inspection Checklist
          </span>
          <span className="text-[12px] text-ink-500">
            {totalPassed} / {checklist.length} passed
          </span>
        </div>

        {categories.map((cat) => {
          const items = checklist.filter((i) => i.cat === cat);
          const catPassed = items.filter((i) => i.pass).length;
          const chip = CHIP_STYLE[cat] ?? {
            bg: 'bg-ink-100',
            text: 'text-ink-600',
          };

          return (
            <div key={cat}>
              <div className="flex items-center justify-between bg-ink-50 px-4 py-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${chip.bg} ${chip.text}`}
                >
                  {cat}
                </span>
                <span className="text-[11px] text-ink-500">
                  {catPassed} / {items.length} passed
                </span>
              </div>

              {items.map((item) => (
                <ChecklistItemRow
                  key={item.n}
                  item={item}
                  onOpenPhoto={(photos, idx) => setViewer({ photos, idx })}
                />
              ))}
            </div>
          );
        })}
      </div>

      {viewer && (
        <PhotoViewerModal state={viewer} onClose={() => setViewer(null)} />
      )}
    </>
  );
}
