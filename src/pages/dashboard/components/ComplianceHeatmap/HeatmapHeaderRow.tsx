import React from 'react';

type Props = { x_axis: string[] };

export default function HeatmapHeaderRow({ x_axis }: Props) {
  return (
    <React.Fragment>
      <div />
      {x_axis.map((gov) => (
        <div
          key={gov}
          className="flex items-end justify-center pb-1 text-[10px] font-semibold uppercase tracking-wide text-ink-500"
          style={{ minHeight: 40 }}
        >
          <span className="text-center leading-tight">{gov}</span>
        </div>
      ))}
      <div className="flex items-end justify-center pb-1">
        <div
          className="flex h-10 w-full items-center justify-center rounded-md bg-ink-100 text-[10px] font-bold uppercase tracking-wide text-ink-500"
          style={{ borderLeft: '2px solid #9ca3af' }}
        >
          AVG
        </div>
      </div>
    </React.Fragment>
  );
}
