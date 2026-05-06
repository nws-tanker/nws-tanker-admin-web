import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { ApprovedSidebar } from '../components/ApprovedSidebar';
import { InspectionSummaryTiles } from '../components/InspectionSummaryTiles';
import { PhysicalInspectionChecklist } from '../components/PhysicalInspectionChecklist';
import { TankerInformation } from '../components/TankerInformation';
import { TraceabilityChain } from '../components/TraceabilityChain';

type Props = { data: InspectionDetailsApiResponse };

export default function ApprovedInspectionDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <TankerInformation data={data} />
        <InspectionSummaryTiles data={data} />
        <PhysicalInspectionChecklist />
        <ActivityTimeline data={data} />
      </div>
      <div className="sticky top-6">
        <ApprovedSidebar />
      </div>
    </div>
  );
}
