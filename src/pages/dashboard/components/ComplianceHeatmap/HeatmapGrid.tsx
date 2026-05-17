import type {
  HeatmapRow,
  GovernorateAverage,
} from '@/types/executiveDashboard';
import HeatmapHeaderRow from './HeatmapHeaderRow';
import HeatmapDataRow from './HeatmapDataRow';
import HeatmapAvgRow from './HeatmapAvgRow';

type Props = {
  x_axis: string[];
  y_axis: string[];
  rows: HeatmapRow[];
  finalAverage: GovernorateAverage[];
  overallAverage: number;
};

export default function HeatmapGrid({
  x_axis,
  y_axis,
  rows,
  finalAverage,
  overallAverage,
}: Props) {
  const colCount = x_axis.length + 1;
  return (
    <div
      className="grid gap-x-1.5 gap-y-2 overflow-x-auto"
      style={{
        gridTemplateColumns: `64px repeat(${colCount}, minmax(72px, 1fr))`,
        gridTemplateRows: `auto repeat(${y_axis.length + 1}, 40px)`,
      }}
    >
      <HeatmapHeaderRow x_axis={x_axis} />
      {rows.map((row) => (
        <HeatmapDataRow key={row.row} row={row} />
      ))}
      <HeatmapAvgRow
        finalAverage={finalAverage}
        overallAverage={overallAverage}
      />
    </div>
  );
}
