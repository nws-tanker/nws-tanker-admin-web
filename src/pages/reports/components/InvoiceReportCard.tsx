import { TankerTypeChip } from '@/common-components/TankerTypeChip';
import type { InvoiceReportResponse } from '@/types';
import { InvoiceExcelButton } from './InvoiceExcelButton';
import { InvoicePdfButton } from './InvoicePdfButton';

type Props = {
  report: InvoiceReportResponse;
  periodLabel: string;
};

const HEADERS = [
  'Month',
  'Contractor (Cluster)',
  'Tanker Type',
  'Inspections Approved',
  'Samples Collected',
  'Permits Issued',
];

export function InvoiceReportCard({ report, periodLabel }: Props) {
  const { rows, totals } = report;

  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <h3 className="text-[13px] font-semibold text-ink-800">
          Invoice Report · {periodLabel}
        </h3>
        <div className="flex items-center gap-2">
          <InvoiceExcelButton report={report} periodLabel={periodLabel} />
          <InvoicePdfButton report={report} periodLabel={periodLabel} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={`whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 ${
                    i >= 3 ? 'text-right' : 'text-left'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={`${r.month}-${r.contractor}-${r.tanker_type}-${idx}`}
                className="border-b border-ink-100 last:border-0"
              >
                <td className="px-4 py-2.5 text-ink-500">{r.month}</td>
                <td className="px-4 py-2.5 text-ink-800">{r.contractor}</td>
                <td className="px-4 py-2.5">
                  <TankerTypeChip type={r.tanker_type} compact />
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-800">
                  {r.inspections_approved}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-800">
                  {r.samples_collected}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                  {r.permits_issued}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50">
              <td
                colSpan={3}
                className="px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink-700"
              >
                Totals · {periodLabel}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.inspections_approved}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.samples_collected}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.permits_issued}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
