import { useNavigate } from 'react-router-dom';
import type { SummaryResponse } from '@/types/executiveDashboard';
import { ROUTES } from '@/constants/routes';
import TotalFleetCard from './TotalFleetCard';
import ComplianceRateCard from './ComplianceRateCard';
import InspectionPassCard from './InspectionPassCard';
import LabSlaCard from './LabSlaCard';
import ExpiringTankersCard from './ExpiringTankersCard';
import ExpiredPermitsCard from './ExpiredPermitsCard';

type Props = { data: SummaryResponse };

export default function SummaryKpiStrip({ data }: Props) {
  const navigate = useNavigate();
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
      <ComplianceRateCard
        compliance={compliance}
        onClick={() => navigate(ROUTES.fleetCompliance)}
      />
      <InspectionPassCard
        inspectionPass={inspection_pass}
        onClick={() => navigate(ROUTES.operations)}
      />
      <LabSlaCard
        labSla={lab_sla}
        onClick={() => navigate(ROUTES.operations)}
      />
      <ExpiringTankersCard
        expiryTankers={expiry_tankers}
        onClick={() => navigate(ROUTES.fleetCompliance)}
      />
      <ExpiredPermitsCard
        permitDetail={permit_detail}
        onClick={() => navigate(ROUTES.fleetCompliance)}
      />
    </div>
  );
}
