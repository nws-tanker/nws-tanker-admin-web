import getCellStyle from './getCellStyle';

type Props = { percentage: number | null };

export default function HeatCell({ percentage }: Props) {
  if (percentage === null) {
    return (
      <div className="flex items-center justify-center rounded-md bg-gray-50 text-sm text-gray-300">
        —
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center rounded-md text-sm font-bold"
      style={getCellStyle(percentage)}
    >
      {percentage}%
    </div>
  );
}
