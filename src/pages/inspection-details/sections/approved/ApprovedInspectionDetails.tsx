import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ActivityTimeline } from '../../components/ActivityTimeline';
import { InspectionSummaryTiles } from '../../components/InspectionSummaryTiles';
import { PhysicalInspectionChecklist } from '../../components/PhysicalInspectionChecklist';
import { InspectionResultPanel } from '../../components/InspectionResultPanel';
import { RequiredDocuments } from '../../components/RequiredDocuments';
import { RecordLocked } from '../../components/RecordLocked';
import { TankerInformation } from '../../components/TankerInformation';
import { TraceabilityChain } from '../../components/TraceabilityChain';
import { PermitHistory } from '../../components/PermitHistory';
import { ApprovalBanner } from './ApprovalBanner';
import { ApprovedSidebar } from './ApprovedSidebar';
import { PermitDetails } from './PermitDetails';

type Props = { data: InspectionDetailsApiResponse };

export default function ApprovedInspectionDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <RecordLocked data={data} />
        <ApprovalBanner />
        <TankerInformation data={data} />
        <InspectionSummaryTiles data={data} />
        <PermitDetails data={data} />
        <PermitHistory data={data} />
        <PhysicalInspectionChecklist sections={data.inspection.sections} />
        <InspectionResultPanel data={data} />
        <RequiredDocuments data={data} />
        <ActivityTimeline data={data} />
      </div>
      <div className="sticky top-6">
        <ApprovedSidebar data={data} />
      </div>
    </div>
  );
}
