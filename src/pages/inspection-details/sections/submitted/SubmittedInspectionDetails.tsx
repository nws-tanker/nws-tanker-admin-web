import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ActivityTimeline } from '../../components/ActivityTimeline';
import { InspectionSummaryTiles } from '../../components/InspectionSummaryTiles';
import { LabReport } from '../../components/LabReport';
import { PhysicalInspectionChecklist } from '../../components/PhysicalInspectionChecklist';
import { TankerInformation } from '../../components/TankerInformation';
import { TraceabilityChain } from '../../components/TraceabilityChain';
import { PermitHistory } from '../../components/PermitHistory';
import { SubmittedSidebar } from './SubmittedSidebar';

type Props = { data: InspectionDetailsApiResponse; onRefetch: () => void };

export default function SubmittedInspectionDetails({ data, onRefetch }: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <TankerInformation data={data} />
        <InspectionSummaryTiles data={data} />
        <PermitHistory data={data} />
        <div className="pointer-events-none select-none opacity-40">
          <LabReport data={data} onUploadSuccess={() => {}} />
        </div>
        <PhysicalInspectionChecklist sections={data.inspection.sections} />
        <ActivityTimeline data={data} />
      </div>
      <div className="sticky top-6">
        <SubmittedSidebar data={data} onRefetch={onRefetch} />
      </div>
    </div>
  );
}
