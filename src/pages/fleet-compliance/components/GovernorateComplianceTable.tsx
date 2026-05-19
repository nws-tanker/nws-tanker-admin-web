import type { GovernorateComplianceResponse } from '@/types/fleetCompliance';
import { getHealthConfig } from '@/pages/dashboard/healthHelpers';
import { ProgressBar } from '@/common-components/ProgressBar';
type Props = {
  data?: GovernorateComplianceResponse;
  printMode?: boolean;
  error?: string;
};

const BAR_COLOR = {
  on_track: 'green',
  at_risk: 'amber',
  critical: 'red',
} as const;

export default function GovernorateComplianceTable({
  data,
  printMode = false,
  error,
}: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-ink-800">
          Compliance by Governorate
        </h3>
      </div>

      <div className={printMode ? undefined : 'overflow-x-auto'}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <th className="px-5 py-3 text-left">Governorate</th>
              <th className="px-4 py-3 text-right">Total Fleet</th>
              <th className="px-4 py-3 text-right">Valid Permit</th>
              <th className="px-4 py-3 text-right">Expired</th>
              <th className="px-4 py-3 text-right">Never Inspected</th>
              <th className="px-5 py-3 text-left" style={{ width: '240px' }}>
                Compliance Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-red-500"
                >
                  {error}
                </td>
              </tr>
            ) : !data || data.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-ink-400"
                >
                  No governorate data available for the selected filters.
                </td>
              </tr>
            ) : (
              data.rows.map((row) => {
                const h = getHealthConfig(row.compliance_rate);
                return (
                  <tr
                    key={row.governorate}
                    className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60"
                  >
                    <td className="px-5 py-3">
                      <span className="font-semibold text-ink-800">
                        {row.governorate}
                      </span>{' '}
                      <span className="text-[10px] font-normal text-ink-400">
                        {row.cluster}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-ink-800">
                      {row.total_fleet.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-ink-800">
                      {row.valid_permit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-red-600">
                      {row.expired.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-red-600">
                      {row.never_inspected.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <ProgressBar
                            value={row.compliance_rate}
                            color={BAR_COLOR[h.status]}
                          />
                        </div>
                        <span className="min-w-[36px] text-right font-mono font-semibold text-ink-900">
                          {row.compliance_rate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
