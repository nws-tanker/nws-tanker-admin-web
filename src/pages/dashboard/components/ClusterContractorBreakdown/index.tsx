import { useNavigate } from 'react-router-dom';
import type { ClusterContractorBreakdownResponse } from '@/types/executiveDashboard';
import MetricsRow from './MetricsRow';
import { COLUMNS } from './breakdownConfig';
import { ROUTES } from '@/constants/routes';

type Props = { data: ClusterContractorBreakdownResponse };

export default function ClusterContractorBreakdown({ data }: Props) {
  const navigate = useNavigate();
  const {
    cluster_details,
    total_details,
    contractor_count,
    governorate_count,
  } = data;

  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
        <h3 className="font-semibold text-ink-700">
          Cluster &amp; Contractor Breakdown
        </h3>
        <span className="text-sm text-ink-400">
          {contractor_count} contractors · {governorate_count} governorates
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                Cluster / Contractor
              </th>
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cluster_details.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="py-12 text-center text-sm text-ink-400"
                >
                  No cluster data available for the selected filters.
                </td>
              </tr>
            ) : (
              <>
                {cluster_details.map((cluster) => (
                  <MetricsRow
                    key={cluster.cluster_name}
                    label={`${cluster.cluster_name} · ${cluster.contractor_name}`}
                    subLabel={cluster.governorates.join(' / ')}
                    metrics={cluster}
                    onClick={() => navigate(ROUTES.fleetCompliance)}
                  />
                ))}
                <MetricsRow
                  label={`Totals · ${contractor_count} contractors`}
                  metrics={total_details}
                  isTotal
                />
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
