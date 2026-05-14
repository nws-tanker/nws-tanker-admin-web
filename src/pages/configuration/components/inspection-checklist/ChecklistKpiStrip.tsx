import KpiCard from './KpiCard';
import type { ChecklistSummary } from '@/types/configuration';

type Props = { summary: ChecklistSummary };

export default function ChecklistKpiStrip({ summary }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <KpiCard
        label="Total Items"
        value={summary.totalItems}
        footnote={summary.totalItemsCaption}
      />
      <KpiCard
        label="Categories"
        value={summary.categoryCount}
        footnote="Grouped sections"
      />
      <KpiCard
        label="Applies To"
        value={summary.appliesToDisplay}
        unit="types"
        footnote="DW · SW · TE (current)"
      />
    </div>
  );
}
