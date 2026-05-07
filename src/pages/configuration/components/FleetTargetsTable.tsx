import { Button, TextInput } from '@/atoms';
import type { FleetTarget, FleetTotals } from '@/types/configuration';

type NumField = 'dw' | 'sw' | 'te';

type Props = {
  targets: FleetTarget[];
  totals: FleetTotals;
  onUpdate: (
    index: number,
    field: NumField | 'gov',
    value: number | string,
  ) => void;
  onDelete: (index: number) => void;
  onAddRow: () => void;
};

const NUM_INPUT_CLASS =
  '!h-8 w-[80px] px-2 text-right font-mono font-semibold text-ink-900';

const TH_CLASS =
  'sticky top-0 border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500';

const TFOOT_CLASS = 'border-t-2 border-ink-200 bg-ink-50';

function rowTotal(r: FleetTarget) {
  return r.dw + r.sw + r.te;
}

export function FleetTargetsTable({
  targets,
  totals,
  onUpdate,
  onDelete,
  onAddRow,
}: Props) {
  const handleNum =
    (index: number, field: NumField) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Math.max(0, parseInt(e.target.value, 10) || 0);
      onUpdate(index, field, v);
    };

  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3.5">
        <div>
          <h3 className="text-[14px] font-semibold text-ink-900">
            Fleet Targets by Governorate
          </h3>
          <p className="mt-0.5 text-[12px] text-ink-500">
            Edit cells directly — totals update instantly
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onAddRow}>
          + Add Row
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <colgroup>
            <col style={{ minWidth: 180 }} />
            <col style={{ width: 110 }} />
            <col style={{ width: 110 }} />
            <col style={{ width: 110 }} />
            <col style={{ width: 110 }} />
            <col style={{ width: 50 }} />
          </colgroup>
          <thead>
            <tr>
              <th className={TH_CLASS}>Governorate</th>
              <th className={`${TH_CLASS} text-right`}>DW</th>
              <th className={`${TH_CLASS} text-right`}>SW</th>
              <th className={`${TH_CLASS} text-right`}>TE</th>
              <th className={`${TH_CLASS} text-right`}>Row Total</th>
              <th className={TH_CLASS} />
            </tr>
          </thead>
          <tbody>
            {targets.map((r, i) => (
              <tr
                key={i}
                className="border-b border-ink-100 last:border-0 hover:bg-ink-50"
              >
                <td className="px-4 py-2.5">
                  {r.custom ? (
                    <TextInput
                      value={r.gov}
                      onChange={(e) => onUpdate(i, 'gov', e.target.value)}
                      className="h-8 w-40 px-2 text-[13px]"
                    />
                  ) : (
                    <span className="font-medium text-ink-800">{r.gov}</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <TextInput
                    type="number"
                    min={0}
                    value={r.dw}
                    onChange={handleNum(i, 'dw')}
                    className={NUM_INPUT_CLASS}
                  />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <TextInput
                    type="number"
                    min={0}
                    value={r.sw}
                    onChange={handleNum(i, 'sw')}
                    className={NUM_INPUT_CLASS}
                  />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <TextInput
                    type="number"
                    min={0}
                    value={r.te}
                    onChange={handleNum(i, 'te')}
                    className={NUM_INPUT_CLASS}
                  />
                </td>
                <td className="px-4 py-2.5 text-right font-semibold text-ink-900">
                  {rowTotal(r).toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {r.custom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(i)}
                      aria-label="Remove row"
                    >
                      ✕
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={TFOOT_CLASS}>
              <td className="px-4 py-2.5 text-[13px] font-bold text-ink-900">
                Grand Total
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-bold text-blue-600">
                {totals.dw.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-600">
                {totals.sw.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-bold text-teal-600">
                {totals.te.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-bold text-ink-900">
                {totals.total.toLocaleString()}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
