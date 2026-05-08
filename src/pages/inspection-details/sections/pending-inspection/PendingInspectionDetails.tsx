import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { PendingInspectionSidebar } from './PendingInspectionSidebar';
import { TankerInformation } from '../../components/TankerInformation';
import { TraceabilityChain } from '../../components/TraceabilityChain';

type Props = { data: InspectionDetailsApiResponse };

export default function PendingInspectionDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
      <div className="flex flex-col gap-4">
        <TraceabilityChain data={data} />
        <TankerInformation data={data} />
      </div>
      <div className="sticky top-6">
        <PendingInspectionSidebar />
      </div>
    </div>
  );
}
