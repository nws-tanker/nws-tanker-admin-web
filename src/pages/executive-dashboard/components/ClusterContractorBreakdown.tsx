import type { ClusterBreakdown } from '@/types/dashboard';
import { ClusterBreakdownRow } from './ClusterBreakdownRow';

type Props = {
  data: ClusterBreakdown | null;
};

export function ClusterContractorBreakdown({ data }: Props) {
  if (!data) {
    return (
      <article className="mb-6 h-[240px] animate-pulse rounded-card-lg border border-ink-200 bg-ink-100" />
    );
  }

  const contractorCount = new Set(data.rows.map((r) => r.contractorName)).size;
  const govCount = data.rows.reduce((s, r) => s + r.governorates.length, 0);

  const totalsRow: import('@/types/dashboard').ClusterBreakdownRow = {
    ...data.totals,
    clusterId: 0,
    clusterName: 'Totals',
    contractorName: '',
    governorates: [],
    status: 'at_risk',
  };

  return (
    <article className="mb-6 rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-ink-900">
          Cluster &amp; Contractor Breakdown
        </h2>
        <p className="text-[12px] text-ink-400">
          {contractorCount} contractors · {govCount} governorates
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[12px]">
          <thead>
            <tr className="bg-ink-50 text-[10px] font-semibold uppercase tracking-widest text-ink-500">
              <th className="px-3 py-2 text-left">Cluster / Contractor</th>
              <th className="px-2 py-2 text-right">Fleet</th>
              <th className="px-2 py-2 text-right">DW</th>
              <th className="px-2 py-2 text-right">SW</th>
              <th className="px-2 py-2 text-right">TE</th>
              <th className="px-2 py-2 text-right">Valid</th>
              <th className="px-2 py-2 text-right">Expired</th>
              <th className="px-2 py-2 text-right">≤30D</th>
              <th className="px-2 py-2 text-right">Pass</th>
              <th className="px-2 py-2 text-right">SLA</th>
              <th className="px-2 py-2 text-right">Lab</th>
              <th className="px-2 py-2 text-right">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <ClusterBreakdownRow key={row.clusterId} row={row} />
            ))}
            <ClusterBreakdownRow row={totalsRow} isTotal />
          </tbody>
        </table>
      </div>
    </article>
  );
}
