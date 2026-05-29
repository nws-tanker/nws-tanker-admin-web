import type { InspectorPerformanceResponse } from '@/types/fleetCompliance';
import RagPill from './RagPill';

type Props = {
  data?: InspectorPerformanceResponse;
  printMode?: boolean;
  error?: string;
};

export default function InspectorPerformanceTable({
  data,
  printMode = false,
  error,
}: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-ink-800">
          Inspector Activity
        </h3>
        {data && (
          <span className="text-xs text-ink-400">
            {data.total_inspectors} inspectors
          </span>
        )}
      </div>

      <div className={printMode ? undefined : 'overflow-x-auto'}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <th className="px-5 py-3 text-left">Inspector</th>
              <th className="px-4 py-3 text-left">Cluster</th>
              <th className="px-4 py-3 text-right">Inspected</th>
              <th className="px-4 py-3 text-right">In Progress</th>
              <th className="px-4 py-3 text-right">Rejected</th>
              <th className="px-4 py-3 text-right">Permits Issued</th>
              <th className="px-5 py-3 text-right">Approval Rate</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-sm text-red-500"
                >
                  {error}
                </td>
              </tr>
            ) : !data || data.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-sm text-ink-400"
                >
                  No inspector data available for the selected filters.
                </td>
              </tr>
            ) : (
              data.rows.map((row) => (
                <tr
                  key={row.inspector_name}
                  className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60"
                >
                  <td className="px-5 py-3 font-semibold text-ink-800">
                    {row.inspector_name}
                  </td>
                  <td className="px-4 py-3 text-ink-400">{row.cluster}</td>
                  <td className="px-4 py-3 text-right font-mono text-ink-800">
                    {row.inspected.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-amber-600">
                    {row.in_progress_count.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-red-600">
                    {row.rejected.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink-800">
                    {row.permits_issued.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <RagPill value={row.compliance_rate} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
