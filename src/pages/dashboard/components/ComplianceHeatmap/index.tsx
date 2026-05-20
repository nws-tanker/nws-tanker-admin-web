import type { ComplianceHeatmapResponse } from '@/types/executiveDashboard';
import HeatmapGrid from './HeatmapGrid';
import HeatmapLegend from './HeatmapLegend';

type Props = { data: ComplianceHeatmapResponse };

export default function ComplianceHeatmap({ data }: Props) {
  const { x_axis, y_axis, data: rows, final_average, overall_average } = data;
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white p-5 shadow-card-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-ink-800">
          Compliance Heatmap by Tanker Type &amp; Governorate
        </h3>
        <span className="text-xs text-ink-400">% compliance · color = RAG</span>
      </div>
      <HeatmapGrid
        x_axis={x_axis}
        y_axis={y_axis}
        rows={rows}
        finalAverage={final_average}
        overallAverage={overall_average}
      />
      <HeatmapLegend />
    </div>
  );
}
