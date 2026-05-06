import { useState } from 'react';
import { Modal } from '@/atoms/Modal';

type ChecklistItem = {
  n: number;
  cat: string;
  text: string;
  pass: boolean;
  note: string | null;
  photos: { id: string; url: string; thumb: string | null }[];
};

const P = (id: string, url: string, thumb: string) => ({ id, url, thumb });

const MOCK_CHECKLIST: ChecklistItem[] = [
  {
    n: 1,
    cat: 'Vehicle Condition',
    text: 'Exterior body is free from significant rust, dents, or structural damage',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_188',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120',
      ),
    ],
  },
  {
    n: 2,
    cat: 'Vehicle Condition',
    text: 'All hatches, manholes, and access points are intact, sealed, and lockable',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_189',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120',
      ),
      P(
        'ph_190',
        'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800',
        'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=120',
      ),
    ],
  },
  {
    n: 3,
    cat: 'Vehicle Condition',
    text: 'Pump and motor assembly is functional and free from leaks',
    pass: false,
    note: 'Inspector noted minor issue; non-critical for certification.',
    photos: [],
  },
  {
    n: 4,
    cat: 'Vehicle Condition',
    text: 'All outlet and inlet valves operate correctly and do not leak',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 5,
    cat: 'Vehicle Condition',
    text: 'Tyre condition is acceptable with no dangerous wear or damage',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_191',
        'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800',
        'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=120',
      ),
    ],
  },
  {
    n: 6,
    cat: 'Vehicle Condition',
    text: 'Vehicle roadworthiness documents are valid and present',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 7,
    cat: 'Tanker Cleanliness',
    text: 'Fill and discharge valves are clean and free from contamination',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 8,
    cat: 'Tanker Cleanliness',
    text: 'Hoses and fittings are stored hygienically and are free from damage',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_192',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120',
      ),
    ],
  },
  {
    n: 9,
    cat: 'Tanker Cleanliness',
    text: 'Tanker has been flushed with clean water prior to inspection',
    pass: false,
    note: null,
    photos: [],
  },
  {
    n: 10,
    cat: 'Documentation',
    text: 'Valid operating permit is present and not expired',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 11,
    cat: 'Documentation',
    text: 'Driver holds a valid driving licence appropriate for the vehicle class',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 12,
    cat: 'Documentation',
    text: 'Last inspection report is available on the vehicle',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 13,
    cat: 'Documentation',
    text: 'Maintenance log is up to date and available for review',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_193',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=800',
        'https://images.unsplash.com/photo-1568667256549-094345857637?w=120',
      ),
      P(
        'ph_194',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      ),
      P(
        'ph_195',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=120',
      ),
    ],
  },
  {
    n: 14,
    cat: 'Documentation',
    text: 'Insurance certificate is valid and present',
    pass: false,
    note: 'Inspector noted minor issue; non-critical for certification.',
    photos: [],
  },
  {
    n: 15,
    cat: 'Safety Equipment',
    text: 'First aid kit is present, stocked, and within expiry date',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 16,
    cat: 'Safety Equipment',
    text: 'Fire extinguisher is present, charged, and within service date',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_196',
        'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=800',
        'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=120',
      ),
    ],
  },
  {
    n: 17,
    cat: 'Safety Equipment',
    text: 'Driver is wearing appropriate personal protective equipment (PPE)',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 18,
    cat: 'Safety Equipment',
    text: 'Emergency contact numbers are posted visibly in the cab',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 19,
    cat: 'Sample Collection',
    text: 'Sample collection point is clean and accessible',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 20,
    cat: 'Sample Collection',
    text: 'Sample bottles are sterile and within expiry date',
    pass: true,
    note: null,
    photos: [
      P(
        'ph_197',
        'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800',
        'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=120',
      ),
    ],
  },
  {
    n: 21,
    cat: 'Sample Collection',
    text: 'Sample collection procedure followed as per Nama protocol',
    pass: false,
    note: 'Inspector noted minor issue; non-critical for certification.',
    photos: [],
  },
  {
    n: 22,
    cat: 'Operational Compliance',
    text: 'Tanker is not being used for any purpose other than its designated type',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 23,
    cat: 'Operational Compliance',
    text: 'No unauthorised modifications have been made to the tanker',
    pass: true,
    note: null,
    photos: [],
  },
  {
    n: 24,
    cat: 'Operational Compliance',
    text: 'GPS tracking device is functioning and active',
    pass: true,
    note: null,
    photos: [],
  },
];

const CHIP_STYLE: Record<string, { bg: string; text: string }> = {
  'Vehicle Condition': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'Tanker Cleanliness': { bg: 'bg-teal-50', text: 'text-teal-700' },
  Documentation: { bg: 'bg-purple-100', text: 'text-purple-800' },
  'Safety Equipment': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'Sample Collection': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  'Operational Compliance': { bg: 'bg-green-100', text: 'text-green-800' },
};

type ViewerState = { photos: ChecklistItem['photos']; idx: number };

function PhotoViewerModal({
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

export function PhysicalInspectionChecklist() {
  const categories = Array.from(new Set(MOCK_CHECKLIST.map((i) => i.cat)));
  const totalPassed = MOCK_CHECKLIST.filter((i) => i.pass).length;
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm">
        <div className="flex items-center justify-between border-b border-ink-100 bg-white px-4 py-3">
          <span className="text-[14px] font-semibold text-ink-800">
            Physical Inspection Checklist
          </span>
          <span className="text-[12px] text-ink-500">
            {totalPassed} / {MOCK_CHECKLIST.length} passed
          </span>
        </div>

        {categories.map((cat) => {
          const items = MOCK_CHECKLIST.filter((i) => i.cat === cat);
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
                <div
                  key={item.n}
                  className={`flex items-start gap-3 border-b border-ink-100 px-4 py-3 ${item.pass ? 'bg-white' : 'bg-[#fef9f9]'}`}
                >
                  <div
                    className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded text-[11px] font-semibold ${
                      item.pass
                        ? 'bg-ink-200 text-ink-600'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {String(item.n).padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-0.5 text-[12px] text-ink-400">{cat}</div>
                    <div className="text-[13px] font-medium text-ink-800">
                      {item.text}
                    </div>
                    {item.photos.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {item.photos.map((photo, pi) => (
                          <button
                            key={photo.id}
                            onClick={() =>
                              setViewer({ photos: item.photos, idx: pi })
                            }
                            className="flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-medium text-teal-700 hover:bg-teal-100 transition-colors"
                          >
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            {item.photos.length > 1
                              ? `Photo ${pi + 1}`
                              : 'View photo'}
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
