import { formatDate } from '@/utils';
import type { InspectionDetailsApiResponse } from '@/types/inspection';

type Props = { data: InspectionDetailsApiResponse };

export function InspectionInfoPanel({ data }: Props) {
  const { assignment, tanker, is_reinspection } = data;

  const rows: { label: string; value: string }[] = [
    { label: 'Inspector', value: assignment.inspector_name },
    { label: 'Type', value: is_reinspection ? 'Reinspection' : 'Annual' },
    {
      label: 'Date',
      value: assignment.scheduled_date
        ? formatDate(assignment.scheduled_date)
        : 'Not scheduled',
    },
    { label: 'Cluster', value: tanker.cluster },
    { label: 'Governorate', value: tanker.governorate },
  ];

  return (
    <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
      <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
          INSPECTION INFO
        </span>
      </div>
      <div className="p-3.5 flex flex-col gap-2.5">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">
              {label}
            </p>
            <p className="text-[12px] text-ink-700">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
