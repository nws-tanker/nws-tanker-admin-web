import { Badge, Button, EmptyState } from '@/atoms';
import { TankerTypeChip } from '@/common-components/TankerTypeChip';
import type { OperationPermitRenewalItem } from '@/types';
import { formatDate } from '@/utils';
import { daysLeftTone, daysUntil, formatDaysLeft } from '../operationsHelpers';

const HEADERS = ['Plate', 'Owner', 'Type', 'Expires', 'Days left', ''];

type Props = {
  items: OperationPermitRenewalItem[];
  urgentCount?: number;
  onOpenAll?: () => void;
  onRenew?: (row: OperationPermitRenewalItem) => void;
};

export function PermitRenewalCard({
  items,
  urgentCount,
  onOpenAll,
  onRenew,
}: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <h3 className="text-[13px] font-semibold text-ink-800">
          Permit Renewal Queue
        </h3>
        <div className="flex items-center gap-2">
          {urgentCount !== undefined && urgentCount > 0 && (
            <Badge tone="red">{urgentCount} urgent</Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onOpenAll}>
            <span className="text-teal-700">View all →</span>
          </Button>
        </div>
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="No permits up for renewal"
          description="Permits nearing expiry will show up here."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {HEADERS.map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((r) => {
                const days = daysUntil(r.expires_at);
                return (
                  <tr
                    key={r.permit_number}
                    className="border-b border-ink-100 last:border-0"
                  >
                    <td className="px-4 py-2.5 font-mono text-[12px] text-ink-800">
                      {r.plate}
                    </td>
                    <td className="px-4 py-2.5 text-ink-700">{r.owner_name}</td>
                    <td className="px-4 py-2.5">
                      <TankerTypeChip type={r.tanker_type} compact />
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-ink-700">
                      {formatDate(r.expires_at)}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge tone={daysLeftTone(days)}>
                        {formatDaysLeft(days)}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRenew?.(r)}
                      >
                        <span className="text-teal-700">Renew</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
