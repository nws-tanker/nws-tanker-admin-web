import React from 'react';
import type { HeatmapRow } from '@/types/executiveDashboard';
import HeatCell from './HeatCell';
import AvgCell from './AvgCell';

const ROW_LABELS: Record<string, string> = { dw: 'DW', sw: 'SW', te: 'TE' };

type Props = { row: HeatmapRow };

export default function HeatmapDataRow({ row }: Props) {
  return (
    <React.Fragment>
      <div
        className="flex w-full items-center justify-center text-sm font-bold text-ink-700"
        style={{ alignSelf: 'stretch' }}
      >
        {ROW_LABELS[row.row]}
      </div>
      {row.values.map((cell) => (
        <HeatCell
          key={`${row.row}-${cell.governorate}`}
          percentage={cell.percentage}
        />
      ))}
      <AvgCell percentage={row.average} leftBorder />
    </React.Fragment>
  );
}
