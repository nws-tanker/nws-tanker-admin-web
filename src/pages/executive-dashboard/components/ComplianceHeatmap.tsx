import type { Heatmap } from '@/types/dashboard';
import { RAG_AT_RISK, RAG_ON_TRACK } from '../executiveDashboardHelpers';
import { HeatmapCell } from './HeatmapCell';

type Props = {
  data: Heatmap | null;
};

export function ComplianceHeatmap({ data }: Props) {
  if (!data) {
    return (
      <article className="mb-6 h-[280px] animate-pulse rounded-card-lg border border-ink-200 bg-ink-100" />
    );
  }

  const colAvgByGov = new Map(
    data.columnAverages.map((c) => [c.governorate, c.value]),
  );

  return (
    <article className="mb-6 rounded-card-lg border border-ink-200 bg-white p-5 shadow-card-sm">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-ink-900">
          Compliance Heatmap by Tanker Type &amp; Governorate
        </h2>
        <p className="text-[12px] text-ink-400">% compliance · color = RAG</p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-[11px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white px-2 py-2 text-left font-semibold text-ink-500" />
              {data.governorates.map((g) => (
                <th
                  key={g}
                  className="px-1 py-2 text-center font-semibold uppercase tracking-wide text-ink-500"
                >
                  {g}
                </th>
              ))}
              <th className="px-2 py-2 text-center font-semibold text-ink-500">
                AVG
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.type}>
                <th className="sticky left-0 bg-white px-2 py-1 text-left font-bold text-ink-800">
                  {row.type}
                </th>
                {row.cells.map((cell) => (
                  <HeatmapCell key={cell.governorate} value={cell.value} />
                ))}
                <HeatmapCell value={row.avg} />
              </tr>
            ))}
            <tr>
              <th className="sticky left-0 bg-ink-50 px-2 py-1 text-left font-semibold text-ink-600">
                Avg
              </th>
              {data.governorates.map((g) => (
                <HeatmapCell key={g} value={colAvgByGov.get(g) ?? null} />
              ))}
              <HeatmapCell
                value={
                  data.columnAverages.length
                    ? data.columnAverages.reduce(
                        (s, c) => s + (c.value ?? 0),
                        0,
                      ) /
                      data.columnAverages.filter((c) => c.value != null).length
                    : null
                }
              />
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-3 flex flex-wrap gap-4 text-[11px] text-ink-500">
        <span className="rounded-md bg-teal-100 px-2 py-0.5 text-teal-900">
          ≥ {RAG_ON_TRACK}%
        </span>
        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-amber-900">
          {RAG_AT_RISK}–{RAG_ON_TRACK - 1}%
        </span>
        <span className="rounded-md bg-red-100 px-2 py-0.5 text-red-900">
          &lt; {RAG_AT_RISK}%
        </span>
      </footer>
    </article>
  );
}
