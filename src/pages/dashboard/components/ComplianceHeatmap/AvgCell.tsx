import getCellStyle from './getCellStyle';

type Props = { percentage: number; topBorder?: boolean; leftBorder?: boolean };

export default function AvgCell({ percentage, topBorder, leftBorder }: Props) {
  return (
    <div
      className="flex items-center justify-center rounded-md text-sm font-bold"
      style={{
        ...getCellStyle(percentage),
        ...(leftBorder ? { borderLeft: '2px solid #9ca3af' } : {}),
        ...(topBorder ? { borderTop: '2px solid #9ca3af' } : {}),
      }}
    >
      {percentage}%
    </div>
  );
}
