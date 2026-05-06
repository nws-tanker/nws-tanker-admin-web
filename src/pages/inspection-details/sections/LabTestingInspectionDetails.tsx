import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { InspectionSummaryTiles } from '../components/InspectionSummaryTiles';
import { LabReport } from '../components/LabReport';
import { LabTestingSidebar } from '../components/LabTestingSidebar';
import { PhysicalInspectionChecklist } from '../components/PhysicalInspectionChecklist';
import { TankerInformation } from '../components/TankerInformation';
import { TraceabilityChain } from '../components/TraceabilityChain';

type Props = { data: InspectionDetailsApiResponse };

export default function LabTestingInspectionDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <TankerInformation data={data} />
        <InspectionSummaryTiles data={data} />
        <LabReport data={data} />
        <PhysicalInspectionChecklist />
        <ActivityTimeline data={data} />
      </div>
      <div className="sticky top-6">
        <LabTestingSidebar />
      </div>
    </div>
  );
}
