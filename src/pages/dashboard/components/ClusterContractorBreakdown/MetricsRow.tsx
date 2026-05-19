import type { ClusterMetrics } from '@/types/executiveDashboard';
import ComplianceCell from './ComplianceCell';
import { COLUMNS, RED_COLS, formatCell } from './breakdownConfig';

type Props = {
  label: string;
  subLabel?: string;
  metrics: ClusterMetrics;
  isTotal?: boolean;
};

export default function MetricsRow({
  label,
  subLabel,
  metrics,
  isTotal,
}: Props) {
  const rowClass = isTotal
    ? 'border-t-2 border-ink-300 bg-ink-50 font-semibold'
    : 'border-b border-ink-100 hover:bg-ink-25';

  return (
    <tr className={rowClass}>
      <td className="px-4 py-3">
        <div
          className={
            isTotal
              ? 'font-semibold text-ink-900'
              : 'font-semibold text-ink-800'
          }
        >
          {label}
        </div>
        {subLabel && (
          <div className="mt-0.5 text-xs text-ink-400">{subLabel}</div>
        )}
      </td>
      {COLUMNS.map(({ key }) => {
        if (key === 'compliance')
          return <ComplianceCell key={key} value={metrics[key]} />;
        const isRed = RED_COLS.has(key);
        const textColor = isTotal
          ? 'text-ink-900'
          : isRed
            ? 'text-red-500'
            : 'text-ink-700';
        return (
          <td key={key} className={`px-4 py-3 text-right text-sm ${textColor}`}>
            {formatCell(key, metrics[key])}
          </td>
        );
      })}
    </tr>
  );
}
