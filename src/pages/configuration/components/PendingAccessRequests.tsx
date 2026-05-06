import { CountBadge } from '@/atoms';
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
    <div className="rounded-card-lg border border-amber-200 bg-amber-50">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-amber-700">
            Pending Access Requests
          </span>
          <CountBadge
            value={requests.length}
            className="bg-amber-600 text-white"
          />
        </div>
        <span className="text-[12px] text-amber-600">
          Nama employee and contractor registrations awaiting role assignment
          &amp; approval
        </span>
      </div>

      <div className="border-t border-amber-200">
        <table className="w-full table-fixed text-[13px]">
          <colgroup>
            {COLUMNS.map((col, i) => (
              <col key={i} style={{ width: col.width }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-amber-600"
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
