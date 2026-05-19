import type { ComplianceByTankerTypeResponse } from '@/types/executiveDashboard';
import TankerComplianceCard from './TankerComplianceCard';

type Props = { data: ComplianceByTankerTypeResponse; subtitle?: string };

export default function ComplianceByTankerType({
  data,
  subtitle = 'Fleet-wide · all clusters',
}: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-ink-800">
          Compliance by Tanker Type
        </h3>
        <span className="text-xs text-ink-400">{subtitle}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        <TankerComplianceCard tankerKey="dw" metrics={data.dw} />
        <TankerComplianceCard tankerKey="sw" metrics={data.sw} />
        <TankerComplianceCard tankerKey="te" metrics={data.te} />
      </div>
    </div>
  );
}
