import type { SummaryResponse } from '@/types/executiveDashboard';
import TotalFleetCard from './TotalFleetCard';
import ComplianceRateCard from './ComplianceRateCard';
import InspectionPassCard from './InspectionPassCard';
import LabSlaCard from './LabSlaCard';
import ExpiringTankersCard from './ExpiringTankersCard';
import ExpiredPermitsCard from './ExpiredPermitsCard';

type Props = { data: SummaryResponse };

export default function SummaryKpiStrip({ data }: Props) {
  const {
    fleet_details,
    compliance,
    inspection_pass,
    lab_sla,
    expiry_tankers,
    permit_detail,
  } = data;
  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      <TotalFleetCard fleetDetails={fleet_details} />
      <ComplianceRateCard compliance={compliance} />
      <InspectionPassCard inspectionPass={inspection_pass} />
      <LabSlaCard labSla={lab_sla} />
      <ExpiringTankersCard expiryTankers={expiry_tankers} />
      <ExpiredPermitsCard permitDetail={permit_detail} />
    </div>
  );
}
