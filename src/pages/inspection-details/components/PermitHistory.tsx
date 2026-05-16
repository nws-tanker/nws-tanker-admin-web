import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatDate } from '@/utils';

function isActive(status: string, expiresAt: string | null): boolean {
  if (status?.toLowerCase() === 'active') return true;
  if (expiresAt && new Date(expiresAt) > new Date()) return true;
  return false;
}

type Props = { data: InspectionDetailsApiResponse };

export function PermitHistory({ data }: Props) {
  const { permit_history } = data;
  const isEmpty = !permit_history || permit_history.length === 0;

  return (
    <div
      className="overflow-hidden rounded-card border border-ink-200 shadow-card-sm"
      style={{ borderLeft: '3px solid #3b82f6' }}
    >
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-[18px] py-3">
        <span className="text-[14px] font-bold text-ink-900">
          Permit History
        </span>
        <span className="text-[12px] text-ink-400">
          {isEmpty
            ? '0 records'
            : `${permit_history.length} record${permit_history.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {isEmpty ? (
        <div className="px-4 py-6 text-center text-[13px] text-ink-500">
          No permit history found.
        </div>
      ) : (
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                Permit No.
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                Issued
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                Expiry
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {permit_history!.map((entry, i) => {
              const active = isActive(entry.status, entry.expires_at);
              return (
                <tr
                  key={entry.permit_number + i}
                  className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50"
                >
                  <td className="px-4 py-3 font-mono text-[13px] font-semibold text-ink-900">
                    {entry.permit_number}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-500">
                    {formatDate(entry.issued_at)}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink-500">
                    {formatDate(entry.expires_at)}
                  </td>
                  <td className="px-4 py-3">
                    {active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Valid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-0.5 text-[11px] font-semibold text-ink-500">
                        Expired
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
