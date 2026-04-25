import type { Inspector, SampleCollector } from '@/types';
import { AssignedInspector } from './AssignedInspector';

type Props = {
  inspector: Inspector | null;
  sampler: SampleCollector | null;
};

export function TankerAssignmentCard({ inspector, sampler }: Props) {
  return (
    <div className="rounded-md border border-ink-200 bg-white px-3.5 py-3">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-ink-500">
        Inspector Assignment
      </div>
      {inspector ? (
        <AssignedInspector inspector={inspector} sampler={sampler} />
      ) : (
        <div className="text-[13px] text-ink-400">
          Not assigned — use the Assign button to assign an inspector.
        </div>
      )}
    </div>
  );
}
