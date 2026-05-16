import type { ClusterBreakdownRow as Row } from '@/types/dashboard';
import {
  formatNumber,
  formatPct,
  ragStatusLabel,
  ragToneClass,
} from '../executiveDashboardHelpers';

type Props = {
  row: Row;
  isTotal?: boolean;
};

export function ClusterBreakdownRow({ row, isTotal }: Props) {
  const label = isTotal
    ? 'Totals'
    : `${row.clusterName} · ${row.contractorName}`;
  const sub = isTotal
    ? null
    : row.governorates.slice(0, 2).join(' / ') +
      (row.governorates.length > 2 ? '…' : '');

  return (
    <tr
      className={
        isTotal ? 'bg-ink-50 font-semibold' : 'border-t border-ink-100'
      }
    >
      <td className="px-3 py-3 text-left">
        <p className="text-[13px] text-ink-900">{label}</p>
        {sub ? <p className="text-[11px] text-ink-400">{sub}</p> : null}
      </td>
      <td className="px-2 py-3 text-right tabular-nums">
        {formatNumber(row.fleet)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-ink-600">
        {formatNumber(row.dw)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-ink-600">
        {formatNumber(row.sw)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-ink-600">
        {formatNumber(row.te)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums">
        {formatNumber(row.valid)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-red-600">
        {formatNumber(row.expired)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-amber-600">
        {formatNumber(row.expiring30)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums">
        {formatPct(row.passRate)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums">
        {formatPct(row.slaRate)}
      </td>
      <td className="px-2 py-3 text-right tabular-nums text-red-600">
        {formatNumber(row.labCount)}
      </td>
      <td className="px-2 py-3 text-right">
        {!isTotal && 'status' in row ? (
          <span
            className={`text-[12px] font-medium ${ragToneClass(row.status)}`}
          >
            {formatPct(row.complianceRate)} · {ragStatusLabel(row.status)}
          </span>
        ) : (
          <span className="text-[12px] font-medium text-amber-600">
            {formatPct(row.complianceRate)}
          </span>
        )}
      </td>
    </tr>
  );
}
