import type { PaymentReportResponse } from '@/types';
import { generatePaymentExcel } from '../excel/paymentExcel';
import { generatePaymentPdf } from '../pdf/paymentPdf';
import { ExcelExportButton } from './ExcelExportButton';
import { PdfExportButton } from './PdfExportButton';

type Props = {
  report: PaymentReportResponse;
  periodLabel: string;
};

const HEADERS = ['Month', 'Inspector', 'Contractor', 'DW', 'SW', 'TE', 'Total'];

export function PaymentReportCard({ report, periodLabel }: Props) {
  const { rows, totals } = report;

  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <h3 className="text-[13px] font-semibold text-ink-800">
          Payment Report · {periodLabel}
        </h3>
        <div className="flex items-center gap-2">
          <ExcelExportButton
            reportLabel="Payment"
            onExport={() => generatePaymentExcel(report, periodLabel)}
          />
          <PdfExportButton
            reportLabel="Payment"
            onExport={() => generatePaymentPdf(report, periodLabel)}
          />
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
                key={`${r.month}-${r.inspector}-${r.contractor}-${idx}`}
                className="border-b border-ink-100 last:border-0"
              >
                <td className="px-4 py-2.5 text-ink-500">{r.month}</td>
                <td className="px-4 py-2.5 font-semibold text-ink-800">
                  {r.inspector}
                </td>
                <td className="px-4 py-2.5 text-ink-500">{r.contractor}</td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-800">
                  {r.dw}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-800">
                  {r.sw}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-800">
                  {r.te}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                  {r.total}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50">
              <td
                colSpan={3}
                className="px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink-700"
              >
                Totals · {totals.inspectors} inspectors
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.dw}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.sw}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.te}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold text-ink-900">
                {totals.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
