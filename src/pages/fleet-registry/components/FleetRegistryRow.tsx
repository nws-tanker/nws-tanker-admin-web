import { Badge, Button, Chip } from '@/atoms';
import {
  PERMIT_BADGE_COLOR,
  PERMIT_LABELS,
  TYPE_CHIP_COLOR,
  TYPE_LABELS,
} from '@/constants/fleet';
import type { Inspector, SampleCollector, Tanker } from '@/types';

type Props = {
  tanker: Tanker;
  governorateName: string;
  clusterName: string;
  inspector: Inspector | null;
  sampler: SampleCollector | null;
  onAssign: (tanker: Tanker) => void;
  onView: (tanker: Tanker) => void;
};

export function FleetRegistryRow({
  tanker,
  governorateName,
  clusterName,
  inspector,
  sampler,
  onAssign,
  onView,
}: Props) {
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12.5px] font-semibold text-ink-900">
        {tanker.plateNumber}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-800">
        {tanker.ownerName}
      </td>
      <td className="border-b border-ink-100 px-4 py-3">
        <Chip tone={TYPE_CHIP_COLOR[tanker.tankerType]}>
          {TYPE_LABELS[tanker.tankerType]}
        </Chip>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-600">
        {governorateName}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[12px] text-ink-500">
        {clusterName}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12px] text-ink-500">
        {tanker.contact}
      </td>
      <td className="border-b border-ink-100 px-4 py-3">
        <Badge tone={PERMIT_BADGE_COLOR[tanker.permit.status]}>
          {PERMIT_LABELS[tanker.permit.status]}
        </Badge>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[12px]">
        {inspector ? (
          <div>
            <div className="font-semibold text-ink-800">{inspector.name}</div>
            {sampler ? (
              <div className="mt-px text-[11px] text-teal-700">
                + {sampler.name}
              </div>
            ) : null}
          </div>
        ) : (
          <span className="text-ink-400">—</span>
        )}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => onAssign(tanker)}>
            Assign
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onView(tanker)}>
            View
          </Button>
        </div>
      </td>
    </tr>
  );
}
