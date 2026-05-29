import { Badge, Button, Chip } from '@/atoms';
import {
  PERMIT_BADGE_COLOR,
  PERMIT_LABELS,
  TYPE_CHIP_COLOR,
  TYPE_LABELS,
} from '@/constants/fleet';
import type { Tanker } from '@/types';
import { formatPhone } from '@/utils';

type Props = {
  tanker: Tanker;
  governorateName: string;
  clusterName: string;
  onView: (tanker: Tanker) => void;
};

export function FleetRegistryRow({
  tanker,
  governorateName,
  clusterName,
  onView,
}: Props) {
  console.log('permit status ', tanker.permit.status);
  return (
    <tr className="hover:bg-ink-50">
      <td className="border-b border-ink-100 px-4 py-3 font-mono text-[12.5px] font-semibold text-ink-900">
        {tanker.plateNo}
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-[13px] text-ink-800">
        {tanker.owner}
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
        {formatPhone(tanker.contact)}
      </td>
      <td className="border-b border-ink-100 px-4 py-3">
        <Badge tone={PERMIT_BADGE_COLOR[tanker.permit.status]}>
          {PERMIT_LABELS[tanker.permit.status]}
        </Badge>
      </td>
      <td className="border-b border-ink-100 px-4 py-3 text-right">
        <Button variant="ghost" size="sm" onClick={() => onView(tanker)}>
          View
        </Button>
      </td>
    </tr>
  );
}
