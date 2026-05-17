import { PendingRequestRow } from './PendingRequestRow';
import type { PendingRequest } from '@/types/configuration';

type Props = {
  requests: PendingRequest[];
  onApprove: (request: PendingRequest) => void;
  onReject: (request: PendingRequest) => void;
};

type Column = { header: string; width: string };

const COLUMNS: Column[] = [
  { header: 'Name', width: 'auto' },
  { header: 'Type', width: '14%' },
  { header: 'Email', width: '20%' },
  { header: 'Mobile', width: '11%' },
  { header: 'CR Number', width: '11%' },
  { header: 'Submitted', width: '16%' },
  { header: '', width: '18%' },
];

export function PendingAccessRequests({
  requests,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="overflow-hidden rounded-card-lg border border-amber-200 bg-amber-50">
      <div className="flex items-center justify-between border-b border-gray-200 bg-amber-50 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-amber-900">
            Pending Access Requests
          </span>
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-bold text-white">
            {requests.length}
          </span>
        </div>
        <span className="text-[12px] text-amber-700">
          Nama employee and contractor registrations awaiting role assignment
          &amp; approval
        </span>
      </div>

      <div>
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            {COLUMNS.map((col, i) => (
              <col key={i} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead className="bg-white">
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-600"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <PendingRequestRow
                key={req.userID}
                request={req}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
