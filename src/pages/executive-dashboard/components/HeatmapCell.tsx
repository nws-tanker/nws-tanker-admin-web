import { ragBgClass } from '../executiveDashboardHelpers';

type Props = {
  value: number | null;
};

export function HeatmapCell({ value }: Props) {
  const display = value == null ? '—' : `${Math.round(value)}%`;
  return (
    <td
      className={`min-w-[72px] rounded-md px-2 py-2 text-center text-[12px] font-semibold ${ragBgClass(value)}`}
    >
      {display}
    </td>
  );
}
