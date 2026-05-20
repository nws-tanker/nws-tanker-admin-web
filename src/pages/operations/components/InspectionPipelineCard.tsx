import { Badge, Button, EmptyState } from '@/atoms';
import { TankerTypeChip } from '@/common-components/TankerTypeChip';
import type { OperationInspectionItem } from '@/types';
import { formatDate } from '@/utils';
import {
  inspectionStatusLabel,
  inspectionStatusTone,
} from '../operationsHelpers';

const HEADERS = [
  'Plate',
  'Inspector',
  'Type',
  'Governorate',
  'Submitted',
  'Status',
];

type Props = {
  items: OperationInspectionItem[];
  onOpenAll?: () => void;
};

export function InspectionPipelineCard({ items, onOpenAll }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-3">
        <h3 className="text-[13px] font-semibold text-ink-800">
          Inspection Pipeline
        </h3>
        <div className="flex items-center gap-2">
          <Badge tone="gray">Today</Badge>
          <Button variant="ghost" size="sm" onClick={onOpenAll}>
            <span className="text-teal-700">View all →</span>
          </Button>
        </div>
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="No inspections yet"
          description="Submitted inspections will appear here as inspectors complete them."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {HEADERS.map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr
                  key={r.inspection_id}
                  className="border-b border-ink-100 last:border-0"
                >
                  <td className="px-4 py-2.5 font-mono text-[12px] text-ink-800">
                    {r.plate}
                  </td>
                  <td className="px-4 py-2.5 text-ink-700">
                    {r.inspector_name}
                  </td>
                  <td className="px-4 py-2.5">
                    <TankerTypeChip type={r.tanker_type} compact />
                  </td>
                  <td className="px-4 py-2.5 text-ink-500">{r.governorate}</td>
                  <td className="px-4 py-2.5 text-ink-500">
                    {formatDate(r.submitted_at)}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge tone={inspectionStatusTone(r.status)}>
                      {inspectionStatusLabel(r.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
