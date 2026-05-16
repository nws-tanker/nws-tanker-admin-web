import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ActivityTimeline } from '../../components/ActivityTimeline';
import { InspectionSummaryTiles } from '../../components/InspectionSummaryTiles';
import { LabReport } from '../../components/LabReport';
import { PendingReviewSidebar } from './PendingReviewSidebar';
import { PhysicalInspectionChecklist } from '../../components/PhysicalInspectionChecklist';
import { RecordLocked } from '../../components/RecordLocked';
import { TankerInformation } from '../../components/TankerInformation';
import { TraceabilityChain } from '../../components/TraceabilityChain';
import { PermitHistory } from '../../components/PermitHistory';

type Props = { data: InspectionDetailsApiResponse; onRefetch: () => void };

export default function PendingReviewInspectionDetails({
  data,
  onRefetch,
}: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <RecordLocked data={data} />
        <TankerInformation data={data} />
        <InspectionSummaryTiles data={data} />
        <LabReport data={data} onUploadSuccess={onRefetch} />
        <PermitHistory data={data} />
        <PhysicalInspectionChecklist sections={data.inspection.sections} />
        <ActivityTimeline data={data} />
      </div>
      <div className="sticky top-6">
        <PendingReviewSidebar data={data} onRefetch={onRefetch} />
      </div>
    </div>
  );
}
