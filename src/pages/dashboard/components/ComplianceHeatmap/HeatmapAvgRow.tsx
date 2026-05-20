import React from 'react';
import type { GovernorateAverage } from '@/types/executiveDashboard';
import AvgCell from './AvgCell';

type Props = { finalAverage: GovernorateAverage[]; overallAverage: number };

export default function HeatmapAvgRow({ finalAverage, overallAverage }: Props) {
  return (
    <React.Fragment>
      <div
        className="flex w-full items-center justify-center rounded-md bg-ink-100 px-3 text-sm font-bold text-ink-600"
        style={{ alignSelf: 'stretch', borderTop: '2px solid #9ca3af' }}
      >
        Avg
      </div>
      {finalAverage.map((ga) => (
        <AvgCell
          key={`final-${ga.governorate}`}
          percentage={ga.percentage}
          topBorder
        />
      ))}
      <AvgCell percentage={overallAverage} topBorder leftBorder />
    </React.Fragment>
  );
}
