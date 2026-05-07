import { ClusterPill } from '@/atoms/ClusterPill';
import { CLUSTER_IDS, CLUSTER_META } from '@/constants/configuration';
import type { ClusterId } from '@/types/configuration';

type Props = {
  assignments: Record<string, ClusterId>;
  onAssign: (contractor: string, cluster: ClusterId) => void;
};

const CONTRACTORS = [
  CLUSTER_META[1].contractor,
  CLUSTER_META[2].contractor,
  CLUSTER_META[3].contractor,
] as const;

export function ClusterContractorsCard({ assignments, onAssign }: Props) {
  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-200 px-5 py-3.5">
        <h3 className="text-[14px] font-semibold text-ink-900">
          Cluster contractors
        </h3>
        <p className="mt-0.5 text-[12px] text-ink-500">
          One contractor per cluster · service agreements
        </p>
      </div>

      <div className="overflow-x-hidden">
        <table className="w-full text-[13px]">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Contractor
              </th>
              <th className="border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                Cluster assignment
              </th>
            </tr>
          </thead>
          <tbody>
            {CONTRACTORS.map((name) => (
              <tr
                key={name}
                className="border-b border-ink-100 last:border-0 hover:bg-ink-50"
              >
                <td className="px-4 py-2.5 font-medium text-ink-800">{name}</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {CLUSTER_IDS.map((c) => (
                      <ClusterPill
                        key={c}
                        label={CLUSTER_META[c].name}
                        color={CLUSTER_META[c].color}
                        active={assignments[name] === c}
                        onClick={() => onAssign(name, c)}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
