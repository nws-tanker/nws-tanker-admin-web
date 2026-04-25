import type { Inspector, SampleCollector } from '@/types';

type Props = {
  inspector: Inspector;
  sampler: SampleCollector | null;
};

export function AssignedInspector({ inspector, sampler }: Props) {
  return (
    <>
      <div className="text-[13px] font-semibold text-ink-900">
        {inspector.name}{' '}
        <span className="font-mono text-[11px] text-ink-400">
          {inspector.id}
        </span>
      </div>
      {sampler ? (
        <div className="mt-1 text-[12px] text-teal-700">
          Sample Collector: {sampler.name}
        </div>
      ) : null}
    </>
  );
}
