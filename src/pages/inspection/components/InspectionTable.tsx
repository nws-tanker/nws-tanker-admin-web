import { EmptyState, Pagination, SearchInput } from '@/atoms';
import type { ApiInspectionRecord, InspectionTab } from '@/types/inspection';
import { ApprovedRow } from './rows/ApprovedRow';
import { LabTestingRow } from './rows/LabTestingRow';
import { PendingInspectionRow } from './rows/PendingInspectionRow';
import { PendingReviewRow } from './rows/PendingReviewRow';
import { RejectedRow } from './rows/RejectedRow';
import { SubmittedRow } from './rows/SubmittedRow';

const HEADERS: Record<InspectionTab, string[]> = {
  'pending-review': [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
    'Submitted',
    'Prior Stage',
    '',
  ],
  'pending-inspection': [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
  ],
  submitted: [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
    'Submitted At',
    '',
  ],
  'lab-testing': [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
    'Submitted',
    '',
  ],
  approved: [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
    'Inspected',
    'Permit No.',
    'Valid Until',
    '',
  ],
  rejected: [
    'Plate',
    'Type',
    'Governorate',
    'Cluster',
    'Inspector',
    'Inspected',
    'Rejection Reason',
    '',
  ],
};

type Props = {
  activeTab: InspectionTab;
  records: ApiInspectionRecord[];
  totalElements: number;
  totalPages: number;
  page: number;
  search: string;
  onSearch: (s: string) => void;
  onPageChange: (p: number) => void;
  onView: (record: ApiInspectionRecord) => void;
  onReview: (record: ApiInspectionRecord) => void;
};

export function InspectionTable({
  activeTab,
  records,
  totalElements,
  totalPages,
  page,
  search,
  onSearch,
  onPageChange,
  onView,
  onReview,
}: Props) {
  const headers = HEADERS[activeTab];
  const displayPage = page + 1;
  const from = totalElements === 0 ? 0 : page * 20 + 1;
  const to = Math.min(page * 20 + records.length, totalElements);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex shrink-0 items-center gap-2.5 border-b border-ink-100 px-5 py-3">
        <SearchInput
          value={search}
          onChange={onSearch}
          placeholder="Search by ID, plate, inspector…"
        />
        <div className="flex-1" />
        <span className="text-[12px] text-ink-400">
          {totalElements} record{totalElements !== 1 ? 's' : ''}
        </span>
      </div>

      {records.length === 0 ? (
        <EmptyState
          title="No inspections in this category"
          description={
            search ? 'Try adjusting your search' : 'Nothing here yet'
          }
        />
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="sticky top-0 whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'pending-review' &&
                  records.map((r) => (
                    <PendingReviewRow
                      key={r.id}
                      record={r}
                      onReview={onReview}
                    />
                  ))}
                {activeTab === 'pending-inspection' &&
                  records.map((r) => (
                    <PendingInspectionRow key={r.id} record={r} />
                  ))}
                {activeTab === 'submitted' &&
                  records.map((r) => (
                    <SubmittedRow key={r.id} record={r} onView={onView} />
                  ))}
                {activeTab === 'lab-testing' &&
                  records.map((r) => (
                    <LabTestingRow key={r.id} record={r} onView={onView} />
                  ))}
                {activeTab === 'approved' &&
                  records.map((r) => (
                    <ApprovedRow key={r.id} record={r} onView={onView} />
                  ))}
                {activeTab === 'rejected' &&
                  records.map((r) => (
                    <RejectedRow key={r.id} record={r} onView={onView} />
                  ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-ink-100 bg-ink-25 px-5 py-3">
              <div className="text-[13px] text-ink-500">
                Showing{' '}
                <strong className="text-ink-800">
                  {from}–{to}
                </strong>{' '}
                of{' '}
                <strong className="text-ink-800">
                  {totalElements.toLocaleString()}
                </strong>{' '}
                records
              </div>
              <Pagination
                page={displayPage}
                totalPages={totalPages}
                onChange={(p) => onPageChange(p - 1)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
